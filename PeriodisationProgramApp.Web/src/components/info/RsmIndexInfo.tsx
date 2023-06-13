import { Stack, Typography } from "@mui/material";

export function RsmIndexInfo() {
  return (
    <Stack spacing={1}>
      <Typography variant="body1" sx={{ fontWeight: 600 }}>
        Raw Stimulus Magnitude
      </Typography>
      <Typography variant="body2">
        The Raw Stimulus Magnitude (RSM) of any training input can be proxied by
        mind-muscle connection, pump, and disruption to the local muscle. Answer
        the questions below and sum the results to calculate your RSM score.
      </Typography>
      <Typography variant="body2" sx={{ fontStyle: "italic" }}>
        The Mind-Muscle Connection
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        On a scale of 0-3 how much did the training challenge your target
        muscles?
      </Typography>
      <Typography variant="body2">
        <span style={{ fontWeight: 600 }}>0:</span> You felt barely aware of
        your target muscles during the exercise
        <br />
        <span style={{ fontWeight: 600 }}>1:</span> You felt like your target
        muscles worked, but mildly
        <br />
        <span style={{ fontWeight: 600 }}>2:</span> You felt a good amount of
        tension and or burn in the target muscles
        <br />
        <span style={{ fontWeight: 600 }}>3:</span> You felt tension and burn
        close to the limit in your target muscles
        <br />
      </Typography>
      <Typography variant="body2" sx={{ fontStyle: "italic" }}>
        The Pump
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        On a scale of 0-3 how much pump did you experience in the target
        muscles?
      </Typography>
      <Typography variant="body2">
        <span style={{ fontWeight: 600 }}>0:</span> You got no pump at all in
        the target muscles
        <br />
        <span style={{ fontWeight: 600 }}>1:</span> You got a very mild pump in
        the target muscles
        <br />
        <span style={{ fontWeight: 600 }}>2:</span> You got a decent pump in the
        target muscles
        <br />
        <span style={{ fontWeight: 600 }}>3:</span> You got close to maximal
        pump in the target muscles
        <br />
      </Typography>
      <Typography variant="body2" sx={{ fontStyle: "italic" }}>
        Muscle Disruption
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        On a scale of 0-3 how much did the training disrupt your target muscles?
      </Typography>
      <Typography variant="body2">
        <span style={{ fontWeight: 600 }}>0:</span> You had no fatigue,
        perturbation, or soreness in the target muscles
        <br />
        <span style={{ fontWeight: 600 }}>1:</span> You had some weakness and
        stiffness after the session in the target muscles, but recovered by the
        next day
        <br />
        <span style={{ fontWeight: 600 }}>2:</span> You had some weakness and
        stiffness in the target muscles after the session and had some soreness
        the following day
        <br />
        <span style={{ fontWeight: 600 }}>3:</span> You got much weaker and felt
        perturbation in the target muscles right after the session and also had
        soreness for a few days or more
        <br />
      </Typography>
    </Stack>
  );
}
