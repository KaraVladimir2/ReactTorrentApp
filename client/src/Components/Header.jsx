import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { TokenContext } from "../Context";
import HeaderLogo from "./UI/HeaderLogo";
import MyButton from "./UI/MyButton";

function Header() {
  const { setToken, isAuth, setIsAuth } = useContext(TokenContext);

  const router = useHistory();

  const logout = () => {
    setToken("");
    setIsAuth(false);
    localStorage.removeItem("token");
    router.go(0);
  };

  return (
    <div className="header">
      <HeaderLogo />
      <div className="auth-buttons">
        {isAuth ? (
          <MyButton onClick={logout}>Выйти</MyButton>
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
