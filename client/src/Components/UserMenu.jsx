import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { TokenContext } from "../Context";
import Notify from "../utils/Toaster";
import UsersService from "../API/UsersService";

const UserMenu = () => {
  const { setToken, setIsAuth, token, username } = useContext(TokenContext);
  const [avatar, setAvatar] = useState();
  const router = useHistory();

  const logout = () => {
    setToken("");
    setIsAuth(false);
    localStorage.removeItem("token");
    router.go(0);
  };

  useEffect(() => {
    async function temp() {
      await UsersService.getInfoFromToken(token).then((response) =>
        response.json().then((data) => {
          if (data.message) {
            return Notify("Токен авторизация истек, авторизуйтесь заново!");
          }
          setAvatar(data.avatar);
        })
      );
    }
    temp();
  }, [token]);

  return (
    <div>
      <button
        className="user-menu btn-13"
        id="user-menu"
        aria-label="User menu"
        aria-haspopup="true"
      >
        <img src="" />
        <p>{username}</p>
      </button>
      <div id="user-menu-dropdown">
        <div className="user-menu-dropdown">
          <Link to="/profile">
            <button>Мой профиль</button>
          </Link>
          <button onClick={logout}>Выйти</button>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
