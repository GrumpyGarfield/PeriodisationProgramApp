import { Stack, Typography } from "@mui/material";

export function MesocycleLengthInfo() {
  return (
    <Stack spacing={1}>
      <Typography variant="body1" sx={{ fontWeight: 600 }}>
        Mesocycle Length
      </Typography>
      <Typography variant="body2">
        Mesocycle length is determined by the time it takes to get from MEV
        (Minimum Effective Volume) to MRV (Maximum Recoverable Volume) for the
        individual. Although you can speed up or slow load and volume
        progressions to fit into a certain meso length, this can only be done to
        the extent that you can still present progressive overload. For example,
        if you need to start your mesocycle at 1 RIR to keep it short enough to
        fit your schedule or you need to start it at 7 RIR to make it long
        enough, both of these options interfere with best training strategies.
        Once you know roughly how long your mesocycles are in each dieting
        phase, most people can then alter them to be longer or shorter by a week
        or so to make them fit into actual life (or competition) plans. Doing
        much more than this is not recommended.
      </Typography>
    </Stack>
  );
}
