import { Stack, Typography, CircularProgress } from "@mui/material";

export function Loader() {
  return (
    <Stack
      direction="row"
      flexWrap="wrap-reverse"
      alignItems="center"
      justifyContent="center"
      spacing={2}
    >
      <CircularProgress size={20} />
      <Typography variant="h6">Loading...</Typography>
    </Stack>
  );
}
