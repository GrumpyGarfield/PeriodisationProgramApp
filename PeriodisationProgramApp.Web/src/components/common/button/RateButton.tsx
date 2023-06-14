import { Checkbox, FormControlLabel, Rating } from "@mui/material";
import { StarBorder, Star } from "@mui/icons-material";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { HoverPopover } from "../popover/HoverPopover";
import { CommunityEntity } from "../../../types/enitities/CommunityEntity";

type Props<T extends CommunityEntity> = {
  id: string;
  rating: number;
  userRating: number | null;
  isRated: boolean;
  handleRate: (
    id: string,
    isRated: boolean,
    rating: number | null
  ) => Promise<T>;
};

export function RateButton<T extends CommunityEntity>({
  id,
  rating,
  userRating,
  isRated,
  handleRate,
}: Props<T>) {
  const [ratingChecked, setRatingChecked] = useState(isRated);
  const [userRatingValue, setUserRatingValue] = useState(userRating);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

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
    <>
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
    </>
  );
}
