import { Box, Typography } from "@mui/material";

type Props = {
  text?: string | null;
};

export function Article({ text }: Props) {
  if (text === undefined || text === null) {
    return null;
  }

  const paragraphs = text.split("\\n");
  let paragraphId = 0;

  return (
    <Box>
      {paragraphs.map((paragraph) => {
        paragraphId++;

        return (
          <Typography key={paragraphId} variant="body1" sx={{ pb: 1 }}>
            {paragraph}
          </Typography>
        );
      })}
    </Box>
  );
}
