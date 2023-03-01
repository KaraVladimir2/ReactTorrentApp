import { Router } from "express";
const usersRouter = Router();
import config from "../config.js";
import jwt from "jsonwebtoken";
import cors from "cors";
import userModel from "../Models/userModel.js";
import multer from "multer";
import bcrypt from "bcrypt";

const upload = multer({ storage: multer.memoryStorage() });

usersRouter.get("/getInfoFromToken", cors(), async (req, res) => {
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

usersRouter.get("/getUser", cors(), async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    try {
      const { username: username } = jwt.verify(token, config.secret);
      userModel.findOne(
        { username: username },
        "username registrationDate",
        (err, user) => {
          return res.json({ success: true, user });
        }
      );
    } catch (error) {
      return res.json({ message: error.message });
    }
  }
});

usersRouter.post(
  "/setUser",
  [upload.single("avatar"), cors()],
  async (req, res) => {
    let fieldForUpdate = JSON.parse(req.body.data);
    const id = fieldForUpdate._id;
    delete fieldForUpdate.oldUsername;
    let encodedAvatar = "";
    let finalAvatar = {};
    try {
      if (fieldForUpdate.password) {
        const hashPassword = bcrypt.hashSync(fieldForUpdate.password, 7);
        fieldForUpdate.password = hashPassword;
      }
      if (req.file) {
        encodedAvatar = req.file.buffer.toString("base64");
        finalAvatar = {
          Buffer: Buffer.from(encodedAvatar, "base64"),
          ContentType: req.file.mimetype,
        };
        fieldForUpdate = { ...fieldForUpdate, avatar: finalAvatar };
      }
      await userModel.updateOne({ _id: id }, { $set: { ...fieldForUpdate } });
      res.json({ success: true, message: "Пользователь обновлен" });
    } catch (error) {
      console.log(error.message);
      res.json({ success: false, message: "Something went wrong" });
    }
  }
);

export default usersRouter;
