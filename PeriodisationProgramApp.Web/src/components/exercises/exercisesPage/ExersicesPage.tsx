import { Stack } from "@mui/material";
import { ExercisesPageHeader } from "./ExercisesPageHeader";
import ExercisesSearch from "./ExercisesSearch";
import ExercisesFilterSidebar from "./ExercisesFilterSidebar";
import ExercisesSort from "./ExercisesSort";
import ExercisesList from "./ExercisesList";
import { PageContent } from "../../common/pageContent/PageContent";
import { PageTitle } from "../../common/pageTitle/PageTitle";
import { PageContentItem } from "../../common/pageContent/PageContentItem";

export function ExercisesPage() {
  return (
    <>
      <PageTitle title="Exercises" />
      <PageContent>
        <PageContentItem>
          <ExercisesPageHeader />
        </PageContentItem>
        <PageContentItem>
          <Stack
            direction="row"
            flexWrap="wrap-reverse"
            alignItems="center"
            justifyContent="space-between"
            sx={{ my: 2 }}
          >
            <ExercisesSearch />
            <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
              <ExercisesFilterSidebar />
              <ExercisesSort />
            </Stack>
          </Stack>
        </PageContentItem>
        <PageContentItem>
          <ExercisesList />
        </PageContentItem>
      </PageContent>
    </>
  );
}
