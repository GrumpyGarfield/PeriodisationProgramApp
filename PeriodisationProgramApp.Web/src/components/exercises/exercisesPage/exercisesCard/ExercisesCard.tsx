import { Card, Stack, Divider } from "@mui/material";
import React from "react";
import CallSplitIcon from "@mui/icons-material/CallSplit";
import { CardListItemProps } from "../../../common/card/CardListItem";
import { CardFooter } from "../../../common/card/CardFooter";
import { ExercisesCardMenu } from "./ExercisesCardMenu";
import { CardHeader } from "../../../common/card/CardHeader";
import { CardList } from "../../../common/card/CardList";
import { MuscleGroupType } from "../../../../enums/MuscleGroupType";
import { useEnumHelper } from "../../../../helpers/useEnumHelper";
import { Exercise } from "../../../../types/enitities/Exercise";
import { ExerciseType } from "../../../../enums/ExerciseType";
import Iconify from "../../../common/iconify/Iconify";

type Props = {
  exercise: Exercise;
  handleLike: (id: string, isLiked: boolean) => Promise<Exercise>;
  handleRate: (
    id: string,
    isRating: boolean,
    rating: number | null
  ) => Promise<Exercise>;
  handleDelete: (id: string) => Promise<boolean>;
};

export default function ExercisesCard({
  exercise,
  handleLike,
  handleRate,
  handleDelete,
}: Props) {
  const [raised, setRaised] = React.useState(false);
  const { translate } = useEnumHelper();

  const exercisesCardListItems: CardListItemProps[] = [
    {
      label: "Target muscle group",
      text: translate(
        "MuscleGroupType",
        MuscleGroupType[exercise.targetMuscleGroup.type]
      ),
      icon: (
        <Iconify
          icon="icon-park-outline:muscle"
          sx={{ width: 24, height: 24 }}
        />
      ),
    },
    {
      label: "Exercise Type",
      text: translate("ExerciseType", ExerciseType[exercise.type]),
      icon: <CallSplitIcon />,
    },
    {
      label: "Stimulus to Fatigue Ratio",
      text: exercise.stimulusToFatigueRatio.toFixed(1),
      icon: (
        <Iconify
          icon="material-symbols:readiness-score-outline-sharp"
          sx={{ width: 24, height: 24 }}
        />
      ),
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
          id={exercise.id}
          text={exercise.name}
          menu={
            <ExercisesCardMenu
              id={exercise.id}
              owner={exercise.user}
              raised={raised}
              setRaised={setRaised}
              handleDelete={handleDelete}
            />
          }
        />
        <CardList items={exercisesCardListItems} />
        <Divider />
        <CardFooter
          entity={exercise}
          handleLike={handleLike}
          handleRate={handleRate}
        />
      </Stack>
    </Card>
  );
}
