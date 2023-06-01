import { PageHeader } from "../../../components/common/pageHeader/PageHeader";

type Props = {
  title: string;
  subtitle?: string;
};

export function MuscleGroupPageHeader({ title, subtitle }: Props) {
  return <PageHeader text={title} subtext={subtitle} />;
}
