import { Card, Stack, Divider, Typography, Link } from "@mui/material";
import React from "react";
import CallSplitIcon from "@mui/icons-material/CallSplit";
import { CardListItemProps } from "../../../common/card/CardListItem";
import { CardFooter } from "../../../common/card/CardFooter";
import { ExercisesCardMenu } from "./ExercisesCardMenu";
import { CardHeader } from "../../../common/card/CardHeader";
import { CardList } from "../../../common/card/CardList";
import { MuscleGroupType } from "../../../../enums/MuscleGroupType";
import { useEnumHelper } from "../../../../helpers/useEnumHelper";
import { UserRatingProps } from "../../../../types/UserRatingProps";
import { Exercise } from "../../../../types/enitities/Exercise";
import { ExerciseType } from "../../../../enums/ExerciseType";
import { MuscleGroupRole } from "../../../../enums/MuscleGroupRole";
import Iconify from "../../../common/iconify/Iconify";
import { theme } from "../../../../styling/Theme";

type Props = {
  exercise: Exercise;
  handleLike: (id: string, isLiked: boolean) => Promise<boolean>;
  handleRate: (
    id: string,
    isRating: boolean,
    rating: number | null
  ) => Promise<UserRatingProps>;
};

export default function ExercisesCard({
  exercise,
  handleLike,
  handleRate,
}: Props) {
  const [raised, setRaised] = React.useState(false);
  const { translate } = useEnumHelper();
  const targetMuscleGroup = exercise.exerciseMuscleGroups.find(
    (muscleGroup) => muscleGroup.muscleGroupRole === MuscleGroupRole.Target
  );

  const exercisesCardListItems: CardListItemProps[] = [
    {
      label: "Target muscle group",
      text: translate(
        "MuscleGroupType",
        MuscleGroupType[targetMuscleGroup!.muscleGroup.type]
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
      label: (
        <Typography variant="caption">
          <Link href="/" color={theme.palette.primary.contrastText}>
            SFR
          </Link>
        </Typography>
      ),
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
          menu={<ExercisesCardMenu raised={raised} setRaised={setRaised} />}
        />
        <CardList items={exercisesCardListItems} />
        <Divider />
        <CardFooter
          author={exercise.user.username}
          rating={exercise.rating}
          likes={exercise.likes}
          isLiked={exercise.isLiked}
          userRatingInfo={{
            isRated: exercise.isRated,
            rating: exercise.userRating,
          }}
          id={exercise.id}
          handleLike={handleLike}
          handleRate={handleRate}
        />
      </Stack>
    </Card>
  );
}
