import { CardMenu } from "../../../common/card/CardMenu";
import { CardMenuItemProps } from "../../../common/card/CardMenuItem";

type Props = {
  raised: boolean;
  setRaised: (isRaised: boolean) => void;
};

const cardMenuItems: CardMenuItemProps[] = [
  { icon: "eva:checkmark-circle-2-fill", label: "Mark Complete" },
  { icon: "eva:edit-fill", label: "Edit" },
  { icon: "eva:share-fill", label: "Share" },
  { icon: "eva:trash-2-outline", label: "Delete", color: "error.main" },
];

export function ExercisesCardMenu({ raised, setRaised }: Props) {
  return (
    <CardMenu
      raised={raised}
      setRaised={setRaised}
      cardMenuItems={cardMenuItems}
    />
  );
}
