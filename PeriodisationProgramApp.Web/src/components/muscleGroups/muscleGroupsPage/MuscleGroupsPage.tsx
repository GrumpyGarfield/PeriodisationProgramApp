import { MuscleGroupsPageHeader } from "./MuscleGroupsPageHeader";
import MuscleGroupsList from "./MuscleGroupsList";
import { PageContent } from "../../common/pageContent/PageContent";
import { PageTitle } from "../../common/pageTitle/PageTitle";
import { PageContentItem } from "../../common/pageContent/PageContentItem";

export function MuscleGroupsPage() {
  return (
    <>
      <PageTitle title="Muscle Groups" />
      <PageContent>
        <MuscleGroupsPageHeader />
        <PageContentItem>
          <MuscleGroupsList />
        </PageContentItem>
      </PageContent>
    </>
  );
}
