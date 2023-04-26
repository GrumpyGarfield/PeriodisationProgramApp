import { Grid, GridProps } from "@mui/material";
import TrainingProgramsCard from "./TrainingProgramsCard";
import { TrainingProgram } from "./TrainingProgramProps";

type Props = {
  trainingPrograms: TrainingProgram[];
} & GridProps;

export default function ProductList({ trainingPrograms, ...other }: Props) {
  return (
    <Grid container spacing={3} {...other}>
      {trainingPrograms.map((trainingProgram) => (
        <Grid key={trainingProgram.id} item xs={12} sm={6} md={4}>
          <TrainingProgramsCard trainingProgram={trainingProgram} />
        </Grid>
      ))}
    </Grid>
  );
}
