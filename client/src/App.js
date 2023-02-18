import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./Components/AppRouter";
import { TokenContext } from "./Context/index";
import AuthService from "./API/AuthService";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notify from "./utils/Toaster";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [username, setUsername] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function temp() {
      localStorage.setItem("token", token);
      await AuthService.getUserInfo(token).then((response) =>
        response.json().then((data) => {
          if (data.message) {
            setToken("");
            localStorage.removeItem("token");
            return Notify("Токен авторизация истек, авторизуйтесь заново!");
          }
          setIsAuth(data.isUser);
          setIsAdmin(data.isAdmin);
          setUsername(data.username);
        })
      );
    }
    temp();
  }, [token]);

  return (
    <TokenContext.Provider
      value={{
        token,
        setToken,
        isAuth,
        setIsAuth,
        isAdmin,
        setIsAdmin,
        username,
        isLoading,
      }}
    >
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
      <ToastContainer />
    </TokenContext.Provider>
  );
}

export default App;
