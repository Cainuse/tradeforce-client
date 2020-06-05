import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

export const Logo = (props) => {
  return (
    <div className={props.className}>
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
    </div>
  );
};
