import React from "react";
import logo from "../assets/logo.png";

export const Logo = (props) => {
  return (<div className={props.className}>
    <img src={logo} alt="logo" />
  </div>);
}