import { MuscleGroupsPageHeader } from "./MuscleGroupsPageHeader";
import MuscleGroupsList from "./MuscleGroupsList";
import { PageContent } from "../../common/pageContent/PageContent";
import { PageTitle } from "../../common/pageTitle/PageTitle";

export function MuscleGroupsPage() {
  return (
    <>
      <PageTitle title="Muscle Groups" />
      <PageContent>
        <MuscleGroupsPageHeader />
        <MuscleGroupsList />
      </PageContent>
    </>
  );
}
