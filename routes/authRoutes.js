import { Router } from "express";
const authRouter = Router();
import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config.js";
import cors from "cors";
import userModel from "../Models/userModel.js";
import roleModel from "../Models/roleModel.js";

const generateAccessToken = (id, roles, username) => {
  const payload = {
    id,
    roles,
    username,
  };
  return jwt.sign(payload, config.secret, { expiresIn: "1h" });
};

authRouter.post(
  "/register",
  [
    check("username", "Имя пользователя не может быть пустым").notEmpty(),
    check(
      "password",
      "Пароль должен быть больше 8 и меньше 20 символов"
    ).isLength({ min: 8, max: 20 }),
    cors(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          isSuccessful: false,
          message: "Ошибка при регистрации",
          errors,
        });
      }
      const { username, password } = req.body;
      const candidate = await userModel.findOne({ username });
      if (candidate) {
        return res.status(400).json({
          isSuccessful: false,
          message: "Пользователь с таким именем уже существует",
        });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await roleModel.findOne({ value: "USER" });
      const user = new userModel({
        username,
        password: hashPassword,
        roles: [userRole.value],
      });
      await user.save();
      const createdUser = await userModel.findOne({ username });
      const token = generateAccessToken(
        createdUser._id,
        createdUser.roles,
        createdUser.username
      );
      return res.json({
        token,
        message: "Пользователь успешно зарегистрирован",
        isSuccessful: true,
      });
    } catch (e) {
      console.log(e);
      res
        .status(400)
        .json({ isSuccessful: false, message: "Registration error" });
    }
  }
);

authRouter.post("/login", cors(), async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(400).json({
        isSuccessful: false,
        message: `Пользователь ${username} не найден`,
      });
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res
        .status(400)
        .json({ isSuccessful: false, message: `Введен неверный пароль` });
    }
    const token = generateAccessToken(user._id, user.roles, user.username);
    return res.json({
      token,
      message: "Вход успешно выполнен!",
      isSuccessful: true,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({ isSuccessful: false, message: "Login error" });
  }
});

export default authRouter;
