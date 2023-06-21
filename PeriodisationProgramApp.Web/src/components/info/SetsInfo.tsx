import { Stack, Typography } from "@mui/material";

export function SetsInfo() {
  return (
    <Stack spacing={1}>
      <Typography variant="body1" sx={{ fontWeight: 600 }}>
        Sets
      </Typography>
      <Typography variant="body2">
        Consider number of sets per exercise between 2 and 5.
      </Typography>
    </Stack>
  );
}
