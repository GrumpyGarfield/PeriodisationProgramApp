import { Grid, TextField, Tooltip, Typography } from "@mui/material";
import { ReactNode } from "react";

export type IndexCardListItemProps = {
  id: string;
  label: string;
  tooltip: string | ReactNode;
  register: any;
  errors: any;
  readonly?: boolean;
};

type Props = {
  items: IndexCardListItemProps[];
};

export function IndexCardList({ items }: Props) {
  const itemsCount = items.length;

  return (
    <Grid
      container
      spacing={2}
      columns={itemsCount}
      sx={{ textAlign: "center" }}
      alignItems="center"
      justifyContent="center"
    >
      {items.map((item) => (
        <Grid item xs={1} key={item.id}>
          <Tooltip arrow title={item.tooltip}>
            <Typography variant="h6">{item.label}</Typography>
          </Tooltip>
        </Grid>
      ))}
      {items.map((item) => (
        <Grid item xs={1} key={`${item.id}-val`}>
          <TextField
            id={item.id}
            type="number"
            inputProps={{
              min: 0,
              style: { textAlign: "center" },
              readOnly: item.readonly === true ? true : false,
            }}
            {...item.register}
            helperText={item.errors[item.id]?.message}
            error={item.errors[item.id] !== undefined}
          />
        </Grid>
      ))}
    </Grid>
  );
}
