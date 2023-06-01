import { Card, Stack, Typography } from "@mui/material";
import React from "react";
import { CardListItemProps } from "../../../common/card/CardListItem";
import { CardHeader } from "../../../common/card/CardHeader";
import { CardList } from "../../../common/card/CardList";
import { MuscleGroupType } from "../../../../enums/MuscleGroupType";
import { useEnumHelper } from "../../../../helpers/useEnumHelper";
import { MuscleGroup } from "../../../../types/enitities/MuscleGroup";

type Props = {
  muscleGroup: MuscleGroup;
};

export default function MuscleGroupsCard({ muscleGroup }: Props) {
  const [raised, setRaised] = React.useState(false);
  const { translate } = useEnumHelper();

  const muscleGroupsCardListItems: CardListItemProps[] = [
    {
      label: "Maintenance Volume",
      text: muscleGroup.maintenanceVolume.toString(),
      icon: <Typography>MV</Typography>,
      sx: { minWidth: 40, mr: 3 },
    },
    {
      label: "Minimum Effective Volume",
      text: muscleGroup.minimumEffectiveVolume.toString(),
      icon: <Typography>MEV</Typography>,
      sx: { minWidth: 40, mr: 3 },
    },
    {
      label: "Maximum Recoverable Volume",
      text: muscleGroup.maximumRecoverableVolume.toString(),
      icon: <Typography>MRV</Typography>,
      sx: { minWidth: 40, mr: 3 },
    },
  ];

  return (
    <Card
      raised={raised}
      onMouseEnter={() => setRaised(true)}
      onMouseLeave={() => setRaised(false)}
      className="block relative"
    >
      <Stack spacing={2} sx={{ p: 3 }}>
        <CardHeader
          id={muscleGroup.id}
          text={translate("MuscleGroupType", MuscleGroupType[muscleGroup.type])}
        />
        <CardList items={muscleGroupsCardListItems} />
      </Stack>
    </Card>
  );
}
