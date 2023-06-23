import { Box, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { Loader } from "../../common/loader/Loader";
import { AxiosError } from "axios";
import { MuscleGroupPageHeader } from "./MuscleGroupPageHeader";
import { useEnumHelper } from "../../../helpers/useEnumHelper";
import { MuscleGroupType } from "../../../enums/MuscleGroupType";
import MuscleGroupPageIndexCard from "./MuscleGroupPageIndexCard";
import MuscleGroupPageExercises from "./MuscleGroupPageExercises";
import { PageContent } from "../../common/pageContent/PageContent";
import { PageContentPanel } from "../../common/pageContent/PageContentPanel";
import { ExercisesProvider } from "../../../context/entityContext/entities/exercise/ExercisesContextProvider";
import useGet from "../../../serverInteraction/hooks/entity/useGet";
import { MuscleGroup } from "../../../types/enitities/MuscleGroup";
import { PageTitle } from "../../common/pageTitle/PageTitle";

type Params = {
  id: string;
};

export function MuscleGroupPage() {
  const { id } = useParams<Params>();
  const {
    status,
    entity: muscleGroup,
    error,
    isLoading,
  } = useGet<MuscleGroup>("muscleGroup", id!);
  const { translate } = useEnumHelper();

  if (isLoading || muscleGroup === undefined) {
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
    <>
      <PageTitle
        title={`${translate(
          "MuscleGroupType",
          MuscleGroupType[muscleGroup.type]
        )} | Muscle Groups`}
      />
      <PageContent pageContentPanel={<PageContentPanel />}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <MuscleGroupPageHeader
              title={translate(
                "MuscleGroupType",
                MuscleGroupType[muscleGroup.type]
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <MuscleGroupPageIndexCard muscleGroup={muscleGroup} />
          </Grid>
        </Grid>
        <Box sx={{ pb: 3 }}>
          <Typography variant="h5">Description</Typography>
        </Box>
        <Box sx={{ pb: 3 }}>
          <Typography variant="h5" sx={{ pb: 3 }}>
            Exercises
          </Typography>
          <ExercisesProvider
            initialFilters={[
              { name: "targetMuscleGroup", value: muscleGroup.type },
            ]}
          >
            <MuscleGroupPageExercises muscleGroupType={muscleGroup.type} />
          </ExercisesProvider>
        </Box>
      </PageContent>
    </>
  );
}
