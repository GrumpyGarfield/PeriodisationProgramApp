import { List } from "@mui/material";
import { CardListItem, CardListItemProps } from "./CardListItem";

type Props = {
  items: CardListItemProps[];
};

export function CardList({ items }: Props) {
  return (
    <List disablePadding>
      {items.map((item) => (
        <CardListItem key={item.text} text={item.text} icon={item.icon} />
      ))}
    </List>
  );
}
