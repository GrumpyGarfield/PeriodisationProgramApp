import { Container, Grid, GridProps, Toolbar } from "@mui/material";
import { PropsWithChildren, ReactNode } from "react";

type Props = {
  pageContentPanel?: ReactNode;
} & GridProps &
  PropsWithChildren;

export function PageContent({ pageContentPanel, children, ...props }: Props) {
  return (
    <Container sx={{ margin: 0, p: 2 }} maxWidth={false} disableGutters={true}>
      <Toolbar />
      {pageContentPanel}
      <Grid container spacing={3} sx={{ flexGrow: 1, p: 2 }} {...props}>
        {children}
      </Grid>
    </Container>
  );
}
