import { Box, Typography } from "@mui/material";
import PageHeaderProps from "./PageHeaderProps";
export function PageHeader({ text, subtext }: PageHeaderProps) {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4">{text}</Typography>
      {subtext === undefined ? null : (
        <Typography sx={{ pt: 2 }}>{subtext}</Typography>
      )}
    </Box>
  );
}
