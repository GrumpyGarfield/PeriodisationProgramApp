import { forwardRef } from "react";
import { Icon } from "@iconify/react";
import { Box, BoxProps } from "@mui/material";

type Props = {
  sx?: object;
  width?: number | string;
  icon: string;
} & BoxProps;

const Iconify = forwardRef(({ icon, width = 20, sx, ...other }: Props, ref) => (
  <Box
    ref={ref}
    component={Icon}
    icon={icon}
    sx={{ width, height: width, ...sx }}
    {...other}
  />
));

export default Iconify;
