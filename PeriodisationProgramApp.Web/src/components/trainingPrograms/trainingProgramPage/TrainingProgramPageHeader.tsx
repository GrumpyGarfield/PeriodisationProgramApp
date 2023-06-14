import { Box, Stack } from "@mui/material";
import { PageHeader } from "../../../components/common/pageHeader/PageHeader";
import { UserRatingProps } from "../../../types/UserRatingProps";
import useLike from "../../../serverInteraction/hooks/communityEntity/useLike";
import useRate from "../../../serverInteraction/hooks/communityEntity/useRate";
import { RateButton } from "../../common/button/RateButton";
import { LikeButton } from "../../common/button/LikeButton";
import { TrainingProgram } from "../../../types/enitities/TrainingProgram";

type Props = {
  title: string;
  subtitle?: string;
  likes: number;
  isLiked: boolean;
  rating: number;
  userRatingInfo: UserRatingProps;
  id: string;
};

export function TrainingProgramPageHeader({
  title,
  subtitle,
  likes,
  isLiked,
  rating,
  userRatingInfo,
  id,
}: Props) {
  const entityName = "trainingProgram";
  const { like } = useLike<TrainingProgram>(entityName);
  const { rate } = useRate<TrainingProgram>(entityName);

  return (
    <Box>
      <PageHeader text={title} subtext={subtitle} />
      <Stack direction="row" spacing={1} flexShrink={0} sx={{ pb: 3 }}>
        <RateButton
          id={id}
          rating={rating}
          userRating={userRatingInfo.rating}
          isRated={userRatingInfo.isRated}
          handleRate={rate}
        />
        <LikeButton id={id} likes={likes} isLiked={isLiked} handleLike={like} />
      </Stack>
    </Box>
  );
}
