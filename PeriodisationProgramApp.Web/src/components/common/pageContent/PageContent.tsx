import { Box, Container, Toolbar } from "@mui/material";
import { PropsWithChildren, ReactNode } from "react";

type Props = {
  pageContentPanel?: ReactNode;
} & PropsWithChildren;

export function PageContent({ pageContentPanel, children }: Props) {
  return (
    <Container sx={{ margin: 0, p: 2 }} maxWidth={false} disableGutters={true}>
      <Toolbar />
      {pageContentPanel}
      <Box sx={{ flexGrow: 1, p: 3 }}>{children}</Box>
    </Container>
  );
}
