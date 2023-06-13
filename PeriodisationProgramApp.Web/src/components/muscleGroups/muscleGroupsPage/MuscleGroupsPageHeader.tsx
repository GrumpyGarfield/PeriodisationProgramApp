import { Stack } from "@mui/material";
import { PageHeader } from "../../../components/common/pageHeader/PageHeader";

export function MuscleGroupsPageHeader() {
  return (
    <Stack
      direction="row"
      flexWrap="wrap-reverse"
      alignItems="flex-end"
      justifyContent="space-between"
      sx={{ mb: 5 }}
    >
      <PageHeader
        text="Muscle Groups"
        subtext="Browse and edit muscle groups info"
      />
    </Stack>
  );
}
