import {
  Card,
  Divider,
  Grid,
  GridProps,
  Stack,
  Typography,
} from "@mui/material";
import { CardHeader } from "../../common/card/CardHeader";
import { MuscleGroupType } from "../../../enums/MuscleGroupType";
import { ExerciseMuscleGroup } from "../../../types/ExerciseMuscleGroup";
import useEnumHelper from "../../../helpers/useEnumHelper";
import { MuscleGroupRole } from "../../../enums/MuscleGroupRole";
import { GridCarousel } from "../../common/carousel/GridCarousel";

type Props = {
  exerciseMuscleGroups: ExerciseMuscleGroup[];
} & GridProps;

export default function ExercisePageMuscleGroups({
  exerciseMuscleGroups,
  ...other
}: Props) {
  const carouselItems: ExerciseMuscleGroup[][] = [];
  const { translate } = useEnumHelper();

  const items = [...exerciseMuscleGroups];

  while (items.length) {
    carouselItems.push(items.splice(0, 4));
  }

  return (
    <GridCarousel totalItems={carouselItems.length}>
      {carouselItems.map((exerciseMuscleGroups: ExerciseMuscleGroup[]) => (
        <Grid
          container
          spacing={3}
          {...other}
          key={exerciseMuscleGroups[0].id}
          sx={{ p: 1 }}
        >
          {exerciseMuscleGroups.map(
            (exerciseMuscleGroup: ExerciseMuscleGroup) => (
              <Grid key={exerciseMuscleGroup.id} item xs={12} sm={6} md={3}>
                <Card>
                  <Stack spacing={2} sx={{ p: 3 }}>
                    <CardHeader
                      id={exerciseMuscleGroup.muscleGroup.id}
                      text={translate(
                        "MuscleGroupType",
                        MuscleGroupType[exerciseMuscleGroup.muscleGroup.type]
                      )}
                      variant="h6"
                      link={`/muscle-groups/${exerciseMuscleGroup.muscleGroup.id}`}
                    />
                    <Divider />
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
                        {translate(
                          "MuscleGroupRole",
                          MuscleGroupRole[exerciseMuscleGroup.muscleGroupRole]
                        )}
                      </Typography>
                    </Stack>
                  </Stack>
                </Card>
              </Grid>
            )
          )}
        </Grid>
      ))}
    </GridCarousel>
  );
}
