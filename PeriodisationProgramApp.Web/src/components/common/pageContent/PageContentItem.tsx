import { Grid, GridProps, Typography } from "@mui/material";
import { PropsWithChildren } from "react";

type Props = {
  title?: string;
} & GridProps &
  PropsWithChildren;

export function PageContentItem({ title, children, ...props }: Props) {
  return (
    <>
      {title && (
        <Grid item xs={12} {...props}>
          <Typography variant="h5">{title}</Typography>
        </Grid>
      )}
      <Grid item xs={12} {...props}>
        {children}
      </Grid>
    </>
  );
}
