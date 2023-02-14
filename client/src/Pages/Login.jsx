import React, { useContext } from "react";
import MyInput from "../Components/UI/MyInput";
import MyButton from "../Components/UI/MyButton";
import { AuthContext } from "../Context";
import { useHistory } from "react-router-dom";

const Login = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const router = useHistory();

  const login = (event) => {
    event.preventDefault();
    setIsAuth(true);
    localStorage.setItem("auth", "true");
    router.push(`/posts`);
  };

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem("auth");
    router.push(`/posts`);
  };

  return (
    <div>
      <h1>Страница для логина</h1>
      <form onSubmit={login}>
        <MyInput type="text" placeholder="Введите логин" />
        <MyInput type="password" placeholder="Введите пароль" />
        <MyButton>Войти</MyButton>
      </form>
      <MyButton onClick={logout}>Выйти</MyButton>
    </div>
  );
};

export default Login;
