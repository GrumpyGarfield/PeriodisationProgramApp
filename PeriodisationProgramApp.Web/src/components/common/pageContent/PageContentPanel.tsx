import { Stack } from "@mui/material";
import { NavigationButton } from "../navigation/NavigationButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { PropsWithChildren } from "react";

export function PageContentPanel({ children }: PropsWithChildren) {
  return (
    <Stack
      direction="row"
      flexWrap="wrap-reverse"
      alignItems="center"
      justifyContent="space-between"
    >
      <NavigationButton text="back" icon={<ArrowBackIcon />} />
      <Stack direction="row" spacing={1} flexShrink={0} sx={{ pr: 3 }}>
        {children}
      </Stack>
    </Stack>
  );
}
