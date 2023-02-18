import { Router } from "express";
const router = Router();
import postModel from "./Models/postModel.js";
import userModel from "./Models/userModel.js";
import roleModel from "./Models/roleModel.js";
import cors from "cors";
import multer from "multer";
import url from "url";
import config from "./config.js";
import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";

const upload = multer({ storage: multer.memoryStorage() });

const generateAccessToken = (id, roles, username) => {
  const payload = {
    id,
    roles,
    username,
  };
  return jwt.sign(payload, config.secret, { expiresIn: "1h" });
};

router.post("/postSend", cors(), upload.array("myImage"), async (req, res) => {
  const {
    title,
    genre,
    description,
    features,
    requirements,
    shortInfo,
    installation,
    size,
  } = JSON.parse(req.body.data);

  const encode_img = [];
  const final_img = [];
  req.files.forEach((element, index) => {
    encode_img[index] = element.buffer.toString("base64");
  });

  encode_img.forEach((element, index) => {
    final_img[index] = {
      Buffer: Buffer.from(element, "base64"),
      ContentType: req.files[index].mimetype,
    };
  });

  const postToAdd = new postModel({
    title,
    genre,
    description,
    features,
    requirements,
    shortInfo,
    installation,
    size,
    titleImage: final_img[0],
    screenshots: [final_img[1], final_img[2], final_img[3], final_img[4]],
    torrentFile: final_img[5],
  });
  try {
    await postToAdd.save();
    res.json({ success: true, message: "Post has been saved" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "Something went wrong" });
  }
});

router.post("/deletePost", cors(), async (req, res) => {
  const { id } = req.body;

  try {
    await postModel.deleteOne({ _id: id });
    res.json({ success: true, message: "Post has been deleted" });
  } catch (error) {
    res.json({ success: false, message: "Something went wrong" });
  }
});

router.post("/postComment", cors(), async (req, res) => {
  try {
    const { text, username, id } = req.body;
    const post = postModel.findOne({ _id: id });
    const comment = { text, owner: username };
    await post.updateOne({}, { $push: { comments: comment } });
    res.json({ success: true, message: "Comment has been sent" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "Something went wrong" });
  }
});

router.post("/getPosts", cors(), async (req, res) => {
  const { page, limit } = req.body;
  try {
    await postModel
      .find()
      .skip((page - 1) * limit)
      .limit(10)
      .exec(function (err, data) {
        res.json({ success: true, data: data });
      });
  } catch (error) {
    res.json({ success: false, message: "Something went wrong" });
  }
});

router.post("/getPostById", cors(), async (req, res) => {
  const { id } = req.body;
  try {
    await postModel
      .findOne({ _id: id }, (err, data) => {
        res.json({ success: true, data: data });
      })
      .clone();
  } catch (error) {
    res.json({ success: false, message: "Something went wrong" });
  }
});

router.post(
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
      const createdUser = await User.findOne({ username });
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

router.post("/login", cors(), async (req, res) => {
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

router.get("/getUserInfo", cors(), async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  let isUser = false;
  let isAdmin = false;
  if (token) {
    try {
      const { roles: userRoles, username: username } = jwt.verify(
        token,
        config.secret
      );
      userRoles.forEach((role) => {
        if (role === "USER" || role === "ADMIN") isUser = true;
        if (role === "ADMIN") isAdmin = true;
      });
      return res.json({ isUser, isAdmin, username });
    } catch (error) {
      return res.json({ message: error.message });
    }
  }
});

export default router;
