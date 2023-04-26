import { ReactNode, memo } from "react";
import { Box, BoxProps } from "@mui/material";
import { StyledRootScrollbar, StyledScrollbar } from "./Styles";

type Props = {
  sx?: object;
  children?: ReactNode;
} & BoxProps;

function Scrollbar({ children, sx, ...other }: Props) {
  const userAgent =
    typeof navigator === "undefined" ? "SSR" : navigator.userAgent;

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    );

  if (isMobile) {
    return (
      <Box sx={{ overflowX: "auto", ...sx }} {...other}>
        {children}
      </Box>
    );
  }

  return (
    <StyledRootScrollbar>
      <StyledScrollbar clickOnTrack={false} sx={sx}>
        {children}
      </StyledScrollbar>
    </StyledRootScrollbar>
  );
}

export default memo(Scrollbar);
