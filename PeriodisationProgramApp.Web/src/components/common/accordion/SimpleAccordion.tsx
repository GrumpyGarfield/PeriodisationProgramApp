import {
  Accordion,
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { PropsWithChildren } from "react";

type Props = {
  title: string;
} & AccordionProps &
  PropsWithChildren;

export function SimpleAccordion({
  title,
  elevation,
  children,
  ...props
}: Props) {
  return (
    <Accordion
      square
      elevation={elevation ? elevation : 0}
      defaultExpanded
      disableGutters
      {...props}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h5">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}
