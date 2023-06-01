import { Box, Container, Grid, Toolbar, Typography } from "@mui/material";
import useMuscleGroup from "../../../context/entityContext/entities/muscleGroup/useMuscleGroup";
import { useParams } from "react-router-dom";
import { Loader } from "../../common/loader/Loader";
import { AxiosError } from "axios";
import { MuscleGroupPageHeader } from "./MuscleGroupPageHeader";
import { useEnumHelper } from "../../../helpers/useEnumHelper";
import { MuscleGroupType } from "../../../enums/MuscleGroupType";
import { NavigationButton } from "../../common/navigation/NavigationButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MuscleGroupPageIndexCard from "./MuscleGroupPageIndexCard";
import { auth } from "../../../firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import MuscleGroupPageExercises from "./MuscleGroupPageExercises";
import { EntitiesProvider } from "../../../context/entityContext/EntitiesContextProvider";

type Params = {
  id: string;
};

export function MuscleGroupPage() {
  const [user] = useAuthState(auth);
  const { id } = useParams<Params>();
  const { status, data, error, isLoading } = useMuscleGroup(id!);
  const { translate } = useEnumHelper();

  const isAuthenticated = user !== null && user !== undefined;

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
    <Container sx={{ margin: 0, p: 2 }} maxWidth={false} disableGutters={true}>
      <Toolbar />
      <NavigationButton text="back" icon={<ArrowBackIcon />} />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <MuscleGroupPageHeader
              title={translate("MuscleGroupType", MuscleGroupType[data.type])}
            />
          </Grid>
          <Grid item xs={4}>
            <MuscleGroupPageIndexCard
              muscleGroup={data}
              isAuthenticated={isAuthenticated}
            />
          </Grid>
        </Grid>
        <Box sx={{ pb: 3 }}>
          <Typography variant="body1">Description</Typography>
        </Box>
        <Box sx={{ pb: 3 }}>
          <Typography variant="h5" sx={{ pb: 3 }}>
            Exercises
          </Typography>
          <EntitiesProvider
            initialFilters={[{ name: "targetMuscleGroup", value: data.type }]}
          >
            <MuscleGroupPageExercises muscleGroupType={data.type} />
          </EntitiesProvider>
        </Box>
      </Box>
    </Container>
  );
}
