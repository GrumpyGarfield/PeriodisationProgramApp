import {
  Card,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  GridProps,
  Stack,
  Typography,
} from "@mui/material";
import { Loader } from "../../common/loader/Loader";
import { AxiosError } from "axios";
import useExercises from "../../../context/entityContext/entities/useExercises";
import { Exercise } from "../../../types/enitities/Exercise";
import { CardHeader } from "../../common/card/CardHeader";
import { Star, StarBorder } from "@mui/icons-material";
import { GridCarousel } from "../../common/carousel/GridCarousel";

type Props = {
  id: string;
} & GridProps;

export default function ExercisePageSimilarExercises({ id, ...other }: Props) {
  const { status, data, error, isLoading } = useExercises(0, 8);
  const carouselItems: Exercise[][] = [];

  if (isLoading || data === undefined) {
    return <Loader />;
  }

  if (status === "error" && error instanceof AxiosError) {
    return (
      <Typography variant="h6" align="center">
        Error: {error.message}
      </Typography>
    );
  }

  const items = [...data.pages[0].items];

  while (items.length) {
    carouselItems.push(items.splice(0, 4));
  }

  return (
    <GridCarousel totalItems={carouselItems.length}>
      {carouselItems.map((exercises: Exercise[]) => (
        <Grid
          container
          spacing={3}
          {...other}
          key={exercises[0].id}
          sx={{ p: 1 }}
        >
          {exercises.map((exercise: Exercise) => (
            <Grid key={exercise.id} item xs={12} sm={6} md={3}>
              <Card>
                <Stack spacing={2} sx={{ p: 3 }}>
                  <CardHeader
                    id={exercise.id}
                    text={exercise.name}
                    variant="h6"
                    link={`/exercises/${exercise.id}`}
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
                      {exercise.user.username}
                    </Typography>
                    <div>
                      <FormControlLabel
                        control={
                          <Checkbox
                            icon={<StarBorder sx={{ fontSize: 20 }} />}
                            checkedIcon={
                              <Star sx={{ fontSize: 20 }} color="secondary" />
                            }
                            checked={exercise.isRated}
                            sx={{ p: 1 }}
                          />
                        }
                        label={exercise.rating.toFixed(1)}
                      />
                    </div>
                  </Stack>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      ))}
    </GridCarousel>
  );
}
