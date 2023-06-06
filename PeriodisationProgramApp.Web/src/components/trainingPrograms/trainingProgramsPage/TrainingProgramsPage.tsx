import { Stack } from "@mui/material";
import { TrainingProgramsPageHeader } from "./TrainingProgramsPageHeader";
import TrainingProgramsList from "./TrainingProgramsList";
import TrainingProgramsSort from "./TrainingProgramsSort";
import TrainingProgramsFilterSidebar from "./TrainingProgramsFilterSidebar";
import TrainingProgramsSearch from "./TrainingProgramsSearch";
import { PageContent } from "../../common/pageContent/PageContent";

export function TrainingProgramsPage() {
  return (
    <PageContent>
      <TrainingProgramsPageHeader />
      <Stack
        direction="row"
        flexWrap="wrap-reverse"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 5 }}
      >
        <TrainingProgramsSearch />
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <TrainingProgramsFilterSidebar />
          <TrainingProgramsSort />
        </Stack>
      </Stack>
      <TrainingProgramsList />
    </PageContent>
  );
}
