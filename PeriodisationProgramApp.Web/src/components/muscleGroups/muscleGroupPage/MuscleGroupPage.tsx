import { Card, Grid, Typography } from "@mui/material";
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
import { PageContentItem } from "../../common/pageContent/PageContentItem";
import { Article } from "../../common/text/Article";

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
        {muscleGroup.description !== undefined &&
          muscleGroup.description !== null && (
            <PageContentItem title="Description">
              <Card sx={{ height: "100%", p: 3 }}>
                <Article text={muscleGroup.description} />
              </Card>
            </PageContentItem>
          )}
        <PageContentItem title="Exercises">
          <ExercisesProvider
            initialFilters={[
              { name: "targetMuscleGroup", value: muscleGroup.type },
            ]}
          >
            <MuscleGroupPageExercises muscleGroupType={muscleGroup.type} />
          </ExercisesProvider>
        </PageContentItem>
      </PageContent>
    </>
  );
}
