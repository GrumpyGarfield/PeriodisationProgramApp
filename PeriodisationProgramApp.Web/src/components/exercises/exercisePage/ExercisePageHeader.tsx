import { Box, Checkbox, FormControlLabel, Rating, Stack } from "@mui/material";
import { PageHeader } from "../../../components/common/pageHeader/PageHeader";
import {
  Favorite,
  FavoriteBorder,
  Star,
  StarBorder,
} from "@mui/icons-material";
import { HoverPopover } from "../../common/popover/HoverPopover";
import { UserRatingProps } from "../../../types/UserRatingProps";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import useLike from "../../../serverInteraction/hooks/communityEntity/useLike";
import useRate from "../../../serverInteraction/hooks/communityEntity/useRate";
import { Exercise } from "../../../types/enitities/Exercise";

type Props = {
  title: string;
  subtitle?: string;
  likes: number;
  isLiked: boolean;
  rating: number;
  userRatingInfo: UserRatingProps;
  id: string;
};

export function ExercisePageHeader({
  title,
  subtitle,
  likes,
  isLiked,
  rating,
  userRatingInfo,
  id,
}: Props) {
  const entityName = "exercise";
  const { like } = useLike<Exercise>(entityName);
  const { rate } = useRate<Exercise>(entityName);

  const [likeChecked, setLikeChecked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(likes);

  const [ratingChecked, setRatingChecked] = useState(userRatingInfo.isRated);
  const [userRating, setUserRating] = useState(userRatingInfo.rating);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleLikeChecked = (
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setLikeChecked(checked);
    setLikeCount(checked ? likeCount + 1 : likeCount - 1);
    like(id, checked).then(
      () => {},
      () => {
        setLikeChecked(!checked);
        setLikeCount(likeCount);
      }
    );
  };

  const handleUserRatingChecked = (
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    if (checked) {
      return;
    }

    var currentValue = userRating;

    setRatingChecked(false);
    setUserRating(null);
    rate(id, false, null).then(
      () => {},
      () => {
        setRatingChecked(true);
        setUserRating(currentValue);
      }
    );
  };

  const handleUserRatingSet = (
    event: SyntheticEvent<Element, Event>,
    value: number | null
  ) => {
    if (value === null) {
      return;
    }

    var currentValue = userRating;

    setRatingChecked(true);
    setUserRating(value);
    rate(id, true, value).then(
      () => {},
      () => {
        setRatingChecked(false);
        setUserRating(currentValue);
      }
    );
  };
  return (
    <Box>
      <PageHeader text={title} subtext={subtitle} />
      <Stack direction="row" spacing={1} flexShrink={0} sx={{ pb: 3 }}>
        <div>
          <FormControlLabel
            control={
              <Checkbox
                icon={<StarBorder sx={{ fontSize: 20 }} />}
                checkedIcon={<Star sx={{ fontSize: 20 }} color="secondary" />}
                checked={ratingChecked}
                onChange={handleUserRatingChecked}
                sx={{ p: 1 }}
              />
            }
            label={rating.toFixed(1)}
            aria-owns={Boolean(anchorEl) ? `rating-popover-${id}` : undefined}
            aria-haspopup="true"
            onMouseEnter={(event: React.MouseEvent<HTMLElement>) =>
              setAnchorEl(event.currentTarget)
            }
            onMouseLeave={() => setAnchorEl(null)}
          />
          <HoverPopover
            id={`rating-popover-${id}`}
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
          >
            <Rating
              name="no-value"
              value={userRating}
              onChange={handleUserRatingSet}
            />
          </HoverPopover>
        </div>
        <FormControlLabel
          control={
            <Checkbox
              icon={
                <FavoriteBorder
                  sx={{
                    fontSize: 20,
                  }}
                />
              }
              checkedIcon={<Favorite sx={{ fontSize: 20 }} color="secondary" />}
              checked={likeChecked}
              onChange={handleLikeChecked}
              sx={{ p: 1 }}
            />
          }
          label={likeCount}
        />
      </Stack>
    </Box>
  );
}
