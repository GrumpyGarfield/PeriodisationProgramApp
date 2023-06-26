import { Box, Stack } from "@mui/material";
import { PageHeader } from "../../../components/common/pageHeader/PageHeader";
import useLike from "../../../serverInteraction/hooks/communityEntity/useLike";
import useRate from "../../../serverInteraction/hooks/communityEntity/useRate";
import { Exercise } from "../../../types/enitities/Exercise";
import { RateButton } from "../../common/button/RateButton";
import { LikeButton } from "../../common/button/LikeButton";
import { MuscleGroupType } from "../../../enums/MuscleGroupType";
import { ExerciseType } from "../../../enums/ExerciseType";
import useEnumHelper from "../../../helpers/useEnumHelper";
import Iconify from "../../common/iconify/Iconify";
import CallSplitIcon from "@mui/icons-material/CallSplit";
import { ChipStackWithTooltips } from "../../common/stack/ChipStackWithTooltips";

type Props = {
  exercise: Exercise;
};

export function ExercisePageHeader({ exercise }: Props) {
  const {
    name,
    likes,
    isLiked,
    rating,
    userRating,
    isRated,
    targetMuscleGroup,
    type,
    user,
    id,
  } = exercise;
  const entityName = "exercise";
  const { like } = useLike<Exercise>(entityName);
  const { rate } = useRate<Exercise>(entityName);
  const { translate } = useEnumHelper();

  const chipStackItems = [
    {
      tooltip: "Target muscle group",
      text: translate(
        "MuscleGroupType",
        MuscleGroupType[targetMuscleGroup.type]
      ),
      icon: (
        <Iconify
          icon="icon-park-outline:muscle"
          sx={{ width: 24, height: 24 }}
        />
      ),
    },
    {
      tooltip: "Exercise Type",
      text: translate("ExerciseType", ExerciseType[type]),
      icon: <CallSplitIcon />,
    },
  ];

  return (
    <Box>
      <PageHeader text={name} subtext={user.username} />
      <Stack direction="row" spacing={1} flexShrink={0}>
        <RateButton
          id={id}
          rating={rating}
          userRating={userRating}
          isRated={isRated}
          handleRate={rate}
        />
        <LikeButton id={id} likes={likes} isLiked={isLiked} handleLike={like} />
      </Stack>
      <ChipStackWithTooltips items={chipStackItems} sx={{ py: 3 }} />
    </Box>
  );
}
