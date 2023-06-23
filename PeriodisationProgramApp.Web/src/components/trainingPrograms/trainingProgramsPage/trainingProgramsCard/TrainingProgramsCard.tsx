import { Card, Stack, Divider } from "@mui/material";
import { TrainingProgram } from "../../../../types/enitities/TrainingProgram";
import React from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import CallSplitIcon from "@mui/icons-material/CallSplit";
import { CardListItemProps } from "../../../common/card/CardListItem";
import { CardFooter } from "../../../common/card/CardFooter";
import { TrainingProgramsCardMenu } from "./TrainingProgramsCardMenu";
import { CardHeader } from "../../../common/card/CardHeader";
import { CardList } from "../../../common/card/CardList";
import { TrainingProgramType } from "../../../../enums/TrainingProgramType";
import { TrainingLevel } from "../../../../enums/TrainingLevel";
import { useEnumHelper } from "../../../../helpers/useEnumHelper";

type Props = {
  trainingProgram: TrainingProgram;
  handleLike: (id: string, isLiked: boolean) => Promise<TrainingProgram>;
  handleRate: (
    id: string,
    isRating: boolean,
    rating: number | null
  ) => Promise<TrainingProgram>;
};

export default function TrainingProgramsCard({
  trainingProgram,
  handleLike,
  handleRate,
}: Props) {
  const [raised, setRaised] = React.useState(false);
  const { translate } = useEnumHelper();
  const trainingProgramsCardListItems: CardListItemProps[] = [
    {
      label: "Split type",
      text: translate(
        "TrainingProgramType",
        TrainingProgramType[trainingProgram.type]
      ),
      icon: <CallSplitIcon />,
    },
    {
      label: "Number of weekly sessions",
      text: trainingProgram.numberOfSessions + " weekly sessions",
      icon: <CalendarMonthIcon />,
    },
    {
      label: "Training level",
      text: translate(
        "TrainingLevel",
        TrainingLevel[trainingProgram.trainingLevel]
      ),
      icon: <AccessibilityNewIcon />,
    },
  ];

  return (
    <Card
      onMouseEnter={() => setRaised(true)}
      onMouseLeave={() => setRaised(false)}
      className="block relative"
    >
      <Stack spacing={2} sx={{ p: 3 }}>
        <CardHeader
          id={trainingProgram.id}
          text={trainingProgram.name}
          menu={
            <TrainingProgramsCardMenu
              id={trainingProgram.id}
              owner={trainingProgram.user}
              raised={raised}
              setRaised={setRaised}
            />
          }
        />
        <CardList items={trainingProgramsCardListItems} />
        <Divider />
        <CardFooter
          entity={trainingProgram}
          handleLike={handleLike}
          handleRate={handleRate}
        />
      </Stack>
    </Card>
  );
}
