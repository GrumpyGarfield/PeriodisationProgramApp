import { Stack, Typography } from "@mui/material";
import { CommunityEntity } from "../../../types/enitities/CommunityEntity";
import { RateButton } from "../button/RateButton";
import { LikeButton } from "../button/LikeButton";

type Props<T extends CommunityEntity> = {
  entity: T;
  handleLike: (id: string, isLiked: boolean) => Promise<T>;
  handleRate: (
    id: string,
    isRated: boolean,
    rating: number | null
  ) => Promise<T>;
};

export function CardFooter<T extends CommunityEntity>({
  entity,
  handleLike,
  handleRate,
}: Props<T>) {
  const { id, isLiked, likes, isRated, rating, userRating, user } = entity;

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
      <Stack direction="row" spacing={0.5} flexShrink={0} maxWidth={"50%"}>
        <RateButton
          id={id}
          rating={rating}
          userRating={userRating}
          isRated={isRated}
          handleRate={handleRate}
        />
        <LikeButton
          id={id}
          likes={likes}
          isLiked={isLiked}
          handleLike={handleLike}
        />
      </Stack>
    </Stack>
  );
}
