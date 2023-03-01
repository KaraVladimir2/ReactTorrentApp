import React, { useContext, useEffect, useState } from "react";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";
import MyButton from "../Components/UI/MyButton";
import MyInput from "../Components/UI/MyInput";
import { TokenContext } from "../Context";
import UsersService from "../API/UsersService";
import { useFetching } from "../Hooks/useFetching";
import Loader from "../Components/UI/Loader";
import AuthService from "../API/AuthService";
import Notify from "../utils/Toaster";

const Profile = () => {
  const { token } = useContext(TokenContext);
  const [userInfo, setUserinfo] = useState(null);
  const [user, setUser] = useState({ username: "" });
  const [fetchUser, isLoading, error] = useFetching(async () => {
    await UsersService.getUser(token).then((response) =>
      response.json().then((data) => {
        setUserinfo(data.user);
      })
    );
  });

  const saveUser = async (e) => {
    e.preventDefault();
    let fieldForUpdate = {};
    if (user.username.length)
      fieldForUpdate = { ...fieldForUpdate, username: user.username };
    if (user.avatar)
      fieldForUpdate = { ...fieldForUpdate, avatar: user.avatar };
    if (user.newPassword) {
      if (user.newPassword.length < 8)
        return Notify("Новый пароль должен быть длиннее 8 символов");
      if (user.passVerification !== user.newPassword)
        return Notify("Пароли не совпадают");
      const validPass = await AuthService.checkPassword(
        userInfo.username,
        user.oldPassword
      );
      if (!validPass) return Notify("Неверный старый пароль");
      fieldForUpdate = { ...fieldForUpdate, password: user.newPassword };
    }
    if (fieldForUpdate !== {})
      fieldForUpdate = { ...fieldForUpdate, _id: userInfo._id };
    await UsersService.setUser(fieldForUpdate);
  };

  useEffect(() => {
    fetchUser();
  }, [token]);

  return (
    <div>
      <Header />
      <Navbar />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="content">
            <h1>Мой профиль</h1>
            <form className="profile-form" onSubmit={saveUser}>
              <h2>Пользователь: {userInfo.username}</h2>
              <h3>Дата регистрации: {userInfo.registrationDate}</h3>
              <h2>Редактирование профиля:</h2>
              <h3>Сменить никнейм:</h3>
              <MyInput
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                type="text"
                placeholder="Имя пользователя"
              />
              <h3>Сменить аватар:</h3>
              <MyInput
                onChange={(e) =>
                  setUser({ ...user, avatar: e.target.files[0] })
                }
                type="file"
                placeholder="Аватар"
              />
              <h3>Сменить пароль:</h3>
              <MyInput
                onChange={(e) =>
                  setUser({ ...user, oldPassword: e.target.value })
                }
                type="password"
                placeholder="Старый пароль"
              />
              <MyInput
                onChange={(e) =>
                  setUser({ ...user, newPassword: e.target.value })
                }
                type="password"
                placeholder="Новый пароль"
              />
              <MyInput
                onChange={(e) =>
                  setUser({ ...user, passVerification: e.target.value })
                }
                type="password"
                placeholder="Повторите новый пароль"
              />
              <MyButton>Сохранить</MyButton>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
