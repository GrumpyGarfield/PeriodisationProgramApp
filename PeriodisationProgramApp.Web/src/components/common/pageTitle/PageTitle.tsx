import { Helmet } from "react-helmet";
import { AppTitle } from "../../../const/Const";

type Props = {
  title: string;
};

export function PageTitle({ title }: Props) {
  return (
    <Helmet>
      <title>{`${title} | ${AppTitle}`}</title>
    </Helmet>
  );
}
