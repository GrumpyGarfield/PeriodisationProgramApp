import {
  Stack,
  Checkbox,
  FormControlLabel,
  Typography,
  Rating,
} from "@mui/material";
import {
  FavoriteBorder,
  Favorite,
  StarBorder,
  Star,
} from "@mui/icons-material";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { HoverPopover } from "../popover/HoverPopover";
import { UserRatingProps } from "../../../types/UserRatingProps";
import { CommunityEntity } from "../../../types/enitities/CommunityEntity";

type Props<T extends CommunityEntity> = {
  entity: T;
  handleLike: (id: string, isLiked: boolean) => Promise<boolean>;
  handleRate: (
    id: string,
    isRated: boolean,
    rating: number | null
  ) => Promise<UserRatingProps>;
};

export function CardFooter<T extends CommunityEntity>({
  entity,
  handleLike,
  handleRate,
}: Props<T>) {
  const { id, isLiked, likes, isRated, rating, userRating, user } = entity;
  const [likeChecked, setLikeChecked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(likes);

  const [ratingChecked, setRatingChecked] = useState(isRated);
  const [userRatingValue, setUserRatingValue] = useState(userRating);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleLikeChecked = (
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setLikeChecked(checked);
    setLikeCount(checked ? likeCount + 1 : likeCount - 1);
    handleLike(id, checked).then(
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

    var currentValue = userRatingValue;

    setRatingChecked(false);
    setUserRatingValue(null);
    handleRate(id, false, null).then(
      () => {},
      () => {
        setRatingChecked(true);
        setUserRatingValue(currentValue);
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

    var currentValue = userRatingValue;

    setRatingChecked(true);
    setUserRatingValue(value);
    handleRate(id, true, value).then(
      () => {},
      () => {
        setRatingChecked(false);
        setUserRatingValue(currentValue);
      }
    );
  };

  return (
    <Stack
      direction="row"
      flexWrap="wrap-reverse"
      alignItems="center"
      justifyContent="space-between"
      sx={{ mb: 5 }}
    >
      <Typography
        variant="subtitle2"
        sx={{ fontStyle: "italic" }}
        maxWidth={"50%"}
        noWrap
      >
        {user.username}
      </Typography>
      <Stack direction="row" spacing={1} flexShrink={0}>
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
              value={userRatingValue}
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
    </Stack>
  );
}
