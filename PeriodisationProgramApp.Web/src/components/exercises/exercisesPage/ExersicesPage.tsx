import { Stack } from "@mui/material";
import { ExercisesPageHeader } from "./ExercisesPageHeader";
import ExercisesSearch from "./ExercisesSearch";
import ExercisesFilterSidebar from "./ExercisesFilterSidebar";
import ExercisesSort from "./ExercisesSort";
import ExercisesList from "./ExercisesList";
import { PageContent } from "../../common/pageContent/PageContent";

export function ExercisesPage() {
  return (
    <PageContent>
      <ExercisesPageHeader />
      <Stack
        direction="row"
        flexWrap="wrap-reverse"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 5 }}
      >
        <ExercisesSearch />
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <ExercisesFilterSidebar />
          <ExercisesSort />
        </Stack>
      </Stack>
      <ExercisesList />
    </PageContent>
  );
}
