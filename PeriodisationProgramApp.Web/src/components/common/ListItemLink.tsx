import React from "react";
import { LinkProps } from "react-router-dom";
import { Link } from "react-router-dom";

export const ListItemLink = React.forwardRef((props: LinkProps, ref) => {
  return <Link {...props} className="no-underline text-inherit"></Link>;
});
