import { Card, CardProps } from "@mui/material";
import { PropsWithChildren } from "react";

export type SimpleCardProps = CardProps & PropsWithChildren;

export function SimpleCard({ children, ...props }: SimpleCardProps) {
  return (
    <Card sx={{ p: 3, position: "relative" }} {...props}>
      {children}
    </Card>
  );
}
