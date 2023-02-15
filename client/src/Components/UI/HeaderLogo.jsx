import React from "react";
import { Link } from "react-router-dom";

export default function HeaderLogo() {
  return (
    <div className="header-logo">
      <Link to="/posts">
        <img
          src="https://vsetop.org/templates/vsetop/images/logo3.gif"
          alt=""
          className="logo"
        />
      </Link>
    </div>
  );
}
