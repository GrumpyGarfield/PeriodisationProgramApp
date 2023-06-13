import { Stack, Typography } from "@mui/material";

export function SfrIndexInfo() {
  return (
    <Stack spacing={1}>
      <Typography variant="body1" sx={{ fontWeight: 600 }}>
        Stimulus to Fatigue Ratio
      </Typography>
      <Typography variant="body2">
        The relationship between the stimulus generating abilities and the
        fatigue consequences of a given exercise, technique variation, session,
        volume of training, or program. In simple terms, the SFR tells you how
        much muscle growth a stimulus will give you for its fatigue cost:
      </Typography>
      <Typography variant="body2" sx={{ fontStyle: "italic", fontWeight: 600 }}>
        RSM + 1 / FM + 1
      </Typography>
    </Stack>
  );
}
