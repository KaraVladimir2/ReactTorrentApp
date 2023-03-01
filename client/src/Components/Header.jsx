import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { TokenContext } from "../Context";
import HeaderLogo from "./UI/HeaderLogo";
import MyButton from "./UI/MyButton";
import UserMenu from "./UserMenu";

function Header() {
  const { isAuth } = useContext(TokenContext);

  return (
    <div className="header">
      <HeaderLogo />
      <div className="auth-buttons">
        {isAuth ? (
          <UserMenu />
        ) : (
          <div>
            <Link to="/login">
              <MyButton>Войти</MyButton>
            </Link>
            <Link to="/register">
              <MyButton>Зарегистрироваться</MyButton>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
