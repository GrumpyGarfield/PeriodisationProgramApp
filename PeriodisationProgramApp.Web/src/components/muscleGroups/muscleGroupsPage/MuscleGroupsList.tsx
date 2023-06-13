import { Grid, GridProps, Typography } from "@mui/material";
import { Loader } from "../../common/loader/Loader";
import { AxiosError } from "axios";
import useMuscleGroups from "../../../context/entityContext/entities/muscleGroup/useMuscleGroups";
import MuscleGroupsCard from "./muscleGroupsCard/MuscleGroupsCard";

export default function MuscleGroupsList({ ...other }: GridProps) {
  const { status, muscleGroups, error, isLoading } = useMuscleGroups();

  if (isLoading || muscleGroups === undefined) {
    return <Loader />;
  }

  if (status === "error" && error instanceof AxiosError) {
    return (
      <Typography variant="h6" align="center">
        Error: {error.message}
      </Typography>
    );
  }

  return (
    <div>
      <Grid container spacing={3} {...other}>
        {muscleGroups.map((muscleGroup) => (
          <Grid key={muscleGroup.type} item sm={12} md={6} lg={4} xl={3}>
            <MuscleGroupsCard muscleGroup={muscleGroup} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
