import { MuscleGroupsPageHeader } from "./MuscleGroupsPageHeader";
import MuscleGroupsList from "./MuscleGroupsList";
import { PageContent } from "../../common/pageContent/PageContent";
import { PageTitle } from "../../common/pageTitle/PageTitle";
import { Grid } from "@mui/material";

export function MuscleGroupsPage() {
  return (
    <>
      <PageTitle title="Muscle Groups" />
      <PageContent>
        <Grid item>
          <MuscleGroupsPageHeader />
        </Grid>
        <Grid item>
          <MuscleGroupsList />
        </Grid>
      </PageContent>
    </>
  );
}
