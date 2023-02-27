import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import About from "./About";
import Advices from "./Advices";
import Contacts from "./Contacts";
import MyModal from "./MyModal";

const Navbar = () => {
  const [modalAdvices, setModalAdvices] = useState(false);
  const [modalAbout, setModalAbout] = useState(false);
  const [modalContacts, setModalContacts] = useState(false);
  const router = useHistory();

  return (
    <div style={{ width: "100%" }}>
      <MyModal visible={modalAdvices} setVisible={setModalAdvices}>
        <Advices />
      </MyModal>
      <MyModal visible={modalAbout} setVisible={setModalAbout}>
        <About />
      </MyModal>
      <MyModal visible={modalContacts} setVisible={setModalContacts}>
        <Contacts />
      </MyModal>
      <ul className="naviga">
        <a href="/posts">
          <li>
            <h2>Главная</h2>
            <p>Самые интересные новости</p>
          </li>
        </a>
        <div onClick={() => setModalAdvices(true)}>
          <li>
            <h2>Советы</h2>
            <p>Рекомендации и инструкция</p>
          </li>
        </div>
        <div onClick={() => setModalAbout(true)}>
          <li>
            <h2>О нас</h2>
            <p>Информация о проекте</p>
          </li>
        </div>
        <div onClick={() => setModalContacts(true)}>
          <li>
            <h2>Контакты</h2>
            <p>Как с нами связаться?</p>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
