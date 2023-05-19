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
import { AxiosError } from "axios";
import useAlert from "../../../context/alertContext/useAlert";
import { HoverPopover } from "../popover/HoverPopover";
import { UserRatingProps } from "../../../types/UserRatingProps";

type Props = {
  author: string;
  likes: number;
  isLiked: boolean;
  rating: number;
  userRatingInfo: UserRatingProps;
  id: string;
  handleLike: (id: string, isLiked: boolean) => Promise<boolean>;
  handleRate: (
    id: string,
    isRated: boolean,
    rating: number | null
  ) => Promise<UserRatingProps>;
};

export function CardFooter({
  author,
  likes,
  isLiked,
  rating,
  userRatingInfo,
  id,
  handleLike,
  handleRate,
}: Props) {
  const [likeChecked, setLikeChecked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(likes);

  const [ratingChecked, setRatingChecked] = useState(userRatingInfo.isRated);
  const [userRating, setUserRating] = useState(userRatingInfo.rating);

  const { showError } = useAlert();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleLikeChecked = (
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setLikeChecked(checked);
    setLikeCount(checked ? likeCount + 1 : likeCount - 1);
    handleLike(id, checked).then(
      () => {},
      (reason: AxiosError) => {
        setLikeChecked(!checked);
        setLikeCount(likeCount);
        showError(reason.message);
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
    handleRate(id, false, null).then(
      () => {},
      (reason: AxiosError) => {
        setRatingChecked(true);
        setUserRating(currentValue);
        showError(reason.message);
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
    handleRate(id, true, value).then(
      () => {},
      (reason: AxiosError) => {
        setRatingChecked(false);
        setUserRating(currentValue);
        showError(reason.message);
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
        {author}
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
    </Stack>
  );
}
