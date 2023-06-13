import { useAuthState } from "react-firebase-hooks/auth";
import { User } from "../../../../types/enitities/User";
import { CardMenu } from "../../../common/card/CardMenu";
import { CardMenuItemProps } from "../../../common/card/CardMenuItem";
import { auth } from "../../../../firebase/Firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { DeleteDialogModal } from "../../../common/modal/DeleteDialogModal";

type Props = {
  id: string;
  owner: User;
  raised: boolean;
  setRaised: (isRaised: boolean) => void;
  handleDelete: (id: string) => void;
};

export function ExercisesCardMenu({
  id,
  owner,
  raised,
  setRaised,
  handleDelete,
}: Props) {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [isRemoveModalOpen, setRemoveModalOpen] = useState(false);

  const cardMenuItems: CardMenuItemProps[] = [
    { icon: "eva:share-fill", label: "Share" },
  ];

  if (user !== null && user !== undefined) {
    cardMenuItems.push({ icon: "cil:clone", label: "Clone" });
  }

  if (user?.uid === owner.firebaseId) {
    cardMenuItems.push(
      {
        icon: "eva:edit-fill",
        label: "Edit",
        onClick: (event: any) => {
          navigate(`${id}/edit`);
        },
      },
      {
        icon: "eva:trash-2-outline",
        label: "Delete",
        color: "error.main",
        onClick: (event: any) => {
          setRemoveModalOpen(true);
        },
      }
    );
  }

  return (
    <>
      <CardMenu
        raised={raised}
        setRaised={setRaised}
        cardMenuItems={cardMenuItems}
      />
      <DeleteDialogModal
        entityName="exercise"
        isOpen={isRemoveModalOpen}
        handleClose={() => setRemoveModalOpen(false)}
        handleDelete={() => {
          setRemoveModalOpen(false);
          handleDelete(id);
        }}
      />
    </>
  );
}
