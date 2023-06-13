import { useAuthState } from "react-firebase-hooks/auth";
import { User } from "../../../../types/enitities/User";
import { CardMenu } from "../../../common/card/CardMenu";
import { CardMenuItemProps } from "../../../common/card/CardMenuItem";
import { auth } from "../../../../firebase/Firebase";

type Props = {
  id: string;
  owner: User;
  raised: boolean;
  setRaised: (isRaised: boolean) => void;
};

export function TrainingProgramsCardMenu({
  id,
  owner,
  raised,
  setRaised,
}: Props) {
  const [user] = useAuthState(auth);

  const cardMenuItems: CardMenuItemProps[] = [
    { icon: "eva:share-fill", label: "Share" },
  ];

  if (user !== null && user !== undefined) {
    cardMenuItems.push({ icon: "cil:clone", label: "Clone" });
  }

  if (user?.uid === owner.firebaseId) {
    cardMenuItems.push(
      { icon: "eva:edit-fill", label: "Edit" },
      { icon: "eva:trash-2-outline", label: "Delete", color: "error.main" }
    );
  }

  return (
    <CardMenu
      raised={raised}
      setRaised={setRaised}
      cardMenuItems={cardMenuItems}
    />
  );
}
