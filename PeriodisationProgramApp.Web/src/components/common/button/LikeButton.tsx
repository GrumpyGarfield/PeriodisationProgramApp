import { Checkbox, FormControlLabel } from "@mui/material";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import { ChangeEvent, useState } from "react";
import { CommunityEntity } from "../../../types/enitities/CommunityEntity";

type Props<T extends CommunityEntity> = {
  id: string;
  likes: number;
  isLiked: boolean;
  handleLike: (id: string, isLiked: boolean) => Promise<T>;
};

export function LikeButton<T extends CommunityEntity>({
  id,
  likes,
  isLiked,
  handleLike,
}: Props<T>) {
  const [likeChecked, setLikeChecked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(likes);

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

  return (
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
  );
}
