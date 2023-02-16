import React, { useContext, useState } from "react";
import MyInput from "../Components/UI/MyInput";
import MyButton from "../Components/UI/MyButton";
import { useHistory } from "react-router-dom";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";
import AuthService from "../API/AuthService";
import { TokenContext } from "../Context";
import { toast } from "react-toastify";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { token, setToken, setIsAuth } = useContext(TokenContext);
  const router = useHistory();

  const updateToken = async (result) => {
    if (result) {
      setToken(result);
      setIsAuth(true);
      localStorage.setItem("token", result);
    }
  };

  function resultNotify(text) {
    toast(text, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  const login = (event) => {
    event.preventDefault();
    AuthService.login(username, password, updateToken, resultNotify);
    router.push(`/posts`);
  };

  return (
    <div>
      <Header />
      <Navbar />
      <h1>Вход</h1>
      <form onSubmit={login}>
        <MyInput
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Введите логин"
        />
        <MyInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Введите пароль"
        />
        <MyButton>Войти</MyButton>
      </form>
    </div>
  );
};

export default Login;
