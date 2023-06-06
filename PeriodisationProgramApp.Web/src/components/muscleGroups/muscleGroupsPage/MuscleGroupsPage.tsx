import { MuscleGroupsPageHeader } from "./MuscleGroupsPageHeader";
import MuscleGroupsList from "./MuscleGroupsList";
import { PageContent } from "../../common/pageContent/PageContent";

export function MuscleGroupsPage() {
  return (
    <PageContent>
      <MuscleGroupsPageHeader />
      <MuscleGroupsList />
    </PageContent>
  );
}
