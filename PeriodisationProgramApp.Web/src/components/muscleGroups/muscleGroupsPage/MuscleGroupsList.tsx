import { Grid, GridProps, Typography } from "@mui/material";
import { Loader } from "../../common/loader/Loader";
import { AxiosError } from "axios";
import useMuscleGroups from "../../../context/entityContext/entities/muscleGroup/useMuscleGroups";
import { MuscleGroup } from "../../../types/enitities/MuscleGroup";
import MuscleGroupsCard from "./muscleGroupsCard/MuscleGroupsCard";

export default function MuscleGroupsList({ ...other }: GridProps) {
  const { status, data, error, isLoading } = useMuscleGroups();

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

  return (
    <div>
      <Grid container spacing={3} {...other}>
        {data.items.map((muscleGroup: MuscleGroup) => (
          <Grid key={muscleGroup.type} item xs={12} sm={6} md={4}>
            <MuscleGroupsCard muscleGroup={muscleGroup} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
