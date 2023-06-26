import { Typography } from "@mui/material";
import PageHeaderProps from "./PageHeaderProps";
import { PageContentItem } from "../pageContent/PageContentItem";

export function PageHeader({ text, subtext }: PageHeaderProps) {
  return (
    <PageContentItem sx={{ pb: 2 }}>
      <Typography variant="h4">{text}</Typography>
      {subtext === undefined ? null : (
        <Typography sx={{ pt: 2 }}>{subtext}</Typography>
      )}
    </PageContentItem>
  );
}
