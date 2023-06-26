import { Box, Stack } from "@mui/material";
import { PageHeader } from "../../../components/common/pageHeader/PageHeader";
import useLike from "../../../serverInteraction/hooks/communityEntity/useLike";
import useRate from "../../../serverInteraction/hooks/communityEntity/useRate";
import { RateButton } from "../../common/button/RateButton";
import { LikeButton } from "../../common/button/LikeButton";
import { TrainingProgram } from "../../../types/enitities/TrainingProgram";
import { ChipStackWithTooltips } from "../../common/stack/ChipStackWithTooltips";
import CallSplitIcon from "@mui/icons-material/CallSplit";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import useEnumHelper from "../../../helpers/useEnumHelper";
import { TrainingProgramType } from "../../../enums/TrainingProgramType";
import { TrainingLevel } from "../../../enums/TrainingLevel";

type Props = {
  trainingProgram: TrainingProgram;
};

export function TrainingProgramPageHeader({ trainingProgram }: Props) {
  const {
    name,
    user,
    likes,
    isLiked,
    rating,
    userRating,
    isRated,
    id,
    type,
    numberOfSessions,
    trainingLevel,
  } = trainingProgram;
  const entityName = "trainingProgram";
  const { like } = useLike<TrainingProgram>(entityName);
  const { rate } = useRate<TrainingProgram>(entityName);
  const { translate } = useEnumHelper();

  const chipStackItems = [
    {
      tooltip: "Split type",
      text: translate("TrainingProgramType", TrainingProgramType[type]),
      icon: <CallSplitIcon />,
    },
    {
      tooltip: "Number of weekly sessions",
      text: numberOfSessions + " weekly sessions",
      icon: <CalendarMonthIcon />,
    },
    {
      tooltip: "Training level",
      text: translate("TrainingLevel", TrainingLevel[trainingLevel]),
      icon: <AccessibilityNewIcon />,
    },
  ];

  return (
    <Box>
      <PageHeader text={name} subtext={user.username} />
      <Stack direction="row" spacing={1}>
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
