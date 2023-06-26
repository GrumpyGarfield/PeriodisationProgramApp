import { Stack } from "@mui/material";
import { TrainingProgramsPageHeader } from "./TrainingProgramsPageHeader";
import TrainingProgramsList from "./TrainingProgramsList";
import TrainingProgramsSort from "./TrainingProgramsSort";
import TrainingProgramsFilterSidebar from "./TrainingProgramsFilterSidebar";
import TrainingProgramsSearch from "./TrainingProgramsSearch";
import { PageContent } from "../../common/pageContent/PageContent";
import { PageTitle } from "../../common/pageTitle/PageTitle";
import { PageContentItem } from "../../common/pageContent/PageContentItem";

export function TrainingProgramsPage() {
  return (
    <>
      <PageTitle title="Training Programs" />
      <PageContent>
        <PageContentItem>
          <TrainingProgramsPageHeader />
        </PageContentItem>
        <PageContentItem>
          <Stack
            direction="row"
            flexWrap="wrap-reverse"
            alignItems="center"
            justifyContent="space-between"
            sx={{ my: 2 }}
          >
            <TrainingProgramsSearch />
            <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
              <TrainingProgramsFilterSidebar />
              <TrainingProgramsSort />
            </Stack>
          </Stack>
        </PageContentItem>
        <PageContentItem>
          <TrainingProgramsList />
        </PageContentItem>
      </PageContent>
    </>
  );
}
