import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./Components/AppRouter";
import { TokenContext } from "./Context/index";
import AuthService from "./API/AuthService";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function temp() {
      localStorage.setItem("token", token);
      await AuthService.checkRole(token).then((response) =>
        response.json().then((data) => {
          setIsAuth(data.isUser);
          setIsAdmin(data.isAdmin);
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
        isLoading,
      }}
    >
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </TokenContext.Provider>
  );
}

export default App;
