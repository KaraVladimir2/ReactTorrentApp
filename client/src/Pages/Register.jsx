import React, { useContext, useState } from "react";
import MyInput from "../Components/UI/MyInput";
import MyButton from "../Components/UI/MyButton";
import { useHistory } from "react-router-dom";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";
import AuthService from "../API/AuthService";
import { TokenContext } from "../Context";
import ReCAPTCHA from "react-google-recaptcha";
import Notify from "../utils/Toaster";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const { setToken } = useContext(TokenContext);
  const router = useHistory();

  const updateToken = async (result) => {
    if (result) {
      setToken(result);
      localStorage.setItem("token", result);
    }
  };

  const register = async (event) => {
    event.preventDefault();
    if (password !== checkPassword) Notify("Пароли не совпадают");
    isVerified
      ? await AuthService.register(username, password, updateToken)
      : Notify("Пройдите captcha");
    router.push(`/register`);
  };

  function handleCaptchaChange(value) {
    if (value) setIsVerified(true);
    else setIsVerified(false);
  }

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
        <MyInput
          value={checkPassword}
          onChange={(e) => setCheckPassword(e.target.value)}
          type="password"
          placeholder="Введите пароль повторно"
        />
        <ReCAPTCHA
          sitekey="6LcPJJckAAAAABUgLItYOyoUIdqfdn2JK-t3T_qj"
          onChange={handleCaptchaChange}
        />
        <MyButton>Зарегистрироваться</MyButton>
      </form>
    </div>
  );
};

export default Register;
