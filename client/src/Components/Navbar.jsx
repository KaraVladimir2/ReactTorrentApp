import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <ul className="naviga">
      <Link to="/posts">
        <li>
          <h2>Главная</h2>
          <p>Самые интересные новости</p>
        </li>
      </Link>
      <Link to="/advices">
        <li>
          <h2>Советы</h2>
          <p>Рекомендации и инструкция</p>
        </li>
      </Link>
      <Link to="/about">
        <li>
          <h2>О нас</h2>
          <p>Информация о проекте</p>
        </li>
      </Link>
      <Link to="/contacts">
        <li>
          <h2>Контакты</h2>
          <p>Как с нами связаться?</p>
        </li>
      </Link>
    </ul>
  );
};

export default Navbar;
