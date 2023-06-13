import { Stack, Typography } from "@mui/material";

export function FmIndexInfo() {
  return (
    <Stack spacing={1}>
      <Typography variant="body1" sx={{ fontWeight: 600 }}>
        Fatigue Magnitude
      </Typography>
      <Typography variant="body2">
        The Fatigue Magnitude (FM) of any training input can be proxied by joint
        and connective tissue disruption, perceived exertion, and unused muscle
        performance. Answer the questions below and sum the results to calculate
        your FM score.
      </Typography>
      <Typography variant="body2" sx={{ fontStyle: "italic" }}>
        Joint and Connective Tissue Disruption
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        On a scale of 0-3 how much did the training disrupt your joints and
        connective tissues?
      </Typography>
      <Typography variant="body2">
        <span style={{ fontWeight: 600 }}>0:</span> You had minimal to no pain
        or perturbation in your joints or connective tissues
        <br />
        <span style={{ fontWeight: 600 }}>1:</span> You had some pain or
        perturbation in your joints and connective tissues but recovered by the
        next day
        <br />
        <span style={{ fontWeight: 600 }}>2:</span> You had some persistent pain
        or tightness in your connective tissues that lasted through the
        following day or several days
        <br />
        <span style={{ fontWeight: 600 }}>3:</span> You develop chronic pain in
        the joints and connective tissues that persists across days to weeks or
        longer
        <br />
      </Typography>
      <Typography variant="body2" sx={{ fontStyle: "italic" }}>
        Perceived Exertion / Perceived Effort Per Set
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        On a scale of 0-3 how much perceived effort went into the training?
      </Typography>
      <Typography variant="body2">
        <span style={{ fontWeight: 600 }}>0:</span> Training felt very easy and
        hardly taxed you psychologically
        <br />
        <span style={{ fontWeight: 600 }}>1:</span> You put effort into the
        training, but felt recovered by the end of the day
        <br />
        <span style={{ fontWeight: 600 }}>2:</span> You put a large effort into
        the training and felt drained through the next day
        <br />
        <span style={{ fontWeight: 600 }}>3:</span> You put an all-out effort
        into the training and felt drained for days
        <br />
      </Typography>
      <Typography variant="body2" sx={{ fontStyle: "italic" }}>
        Unused Muscle Performance
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        On a scale of 0-3 how much performance falloff did you see in unused
        muscles?
      </Typography>
      <Typography variant="body2">
        <span style={{ fontWeight: 600 }}>0:</span> Performance on subsequent
        exercises targeting unused muscles was better than expected
        <br />
        <span style={{ fontWeight: 600 }}>1:</span> Performance on subsequent
        exercises targeting unused muscles was as expected
        <br />
        <span style={{ fontWeight: 600 }}>2:</span> Performance on subsequent
        exercises targeting unused muscles was worse than expected
        <br />
        <span style={{ fontWeight: 600 }}>3:</span> Your performance on
        subsequent exercises targeting unused muscles was hugely deteriorated
        <br />
      </Typography>
    </Stack>
  );
}
