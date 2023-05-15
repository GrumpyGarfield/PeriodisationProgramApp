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
import { EnumHelper } from "../../../../helpers/EnumHelper";

type Props = {
  trainingProgram: TrainingProgram;
};

export default function TrainingProgramsCard({ trainingProgram }: Props) {
  const [raised, setRaised] = React.useState(false);

  const trainingProgramsCardListItems: CardListItemProps[] = [
    {
      text: EnumHelper.translate(
        "TrainingProgramType",
        TrainingProgramType[trainingProgram.type]
      ),
      icon: <CallSplitIcon />,
    },
    {
      text: trainingProgram.numberOfSessions + " weekly sessions",
      icon: <CalendarMonthIcon />,
    },
    {
      text: EnumHelper.translate(
        "TrainingLevel",
        TrainingLevel[trainingProgram.trainingLevel]
      ),
      icon: <AccessibilityNewIcon />,
    },
  ];

  return (
    <Card
      raised={raised}
      onMouseEnter={() => setRaised(true)}
      onMouseLeave={() => setRaised(false)}
      className="block relative"
    >
      <Stack spacing={2} sx={{ p: 3 }}>
        <CardHeader
          id={trainingProgram.id}
          text={trainingProgram.name}
          menu={
            <TrainingProgramsCardMenu raised={raised} setRaised={setRaised} />
          }
        />
        <CardList items={trainingProgramsCardListItems} />
        <Divider />
        <CardFooter
          author={trainingProgram.user.username}
          rating={trainingProgram.rating}
          likes={trainingProgram.likes}
        />
      </Stack>
    </Card>
  );
}
