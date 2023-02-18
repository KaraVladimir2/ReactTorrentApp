import React, { useContext, useState } from "react";
import MyInput from "../Components/UI/MyInput";
import MyButton from "../Components/UI/MyButton";
import { useHistory } from "react-router-dom";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";
import AuthService from "../API/AuthService";
import { TokenContext } from "../Context";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { token, setToken } = useContext(TokenContext);
  const router = useHistory();

  const updateToken = async (result) => {
    if (result) {
      setToken(result);
      localStorage.setItem("token", result);
    }
  };

  const register = async (event) => {
    event.preventDefault();
    await AuthService.register(username, password, updateToken);
    router.push(`/posts`);
  };

  return (
    <div>
      <Header />
      <Navbar />
      <h1>Регистрация</h1>
      <form onSubmit={register}>
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
        <MyButton>Зарегистрироваться</MyButton>
      </form>
    </div>
  );
};

export default Register;
