import React from "react";
import "./HeaderStyles.css";
import "../SignForm/SignFormStyles.css";

function HeaderWrapper({ children, ...restProps }) {
  return <header {...restProps}>{children}</header>;
}

export default HeaderWrapper;
