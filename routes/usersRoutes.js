import { Router } from "express";
const usersRouter = Router();
import config from "../config.js";
import jwt from "jsonwebtoken";
import cors from "cors";

usersRouter.get("/getUserInfo", cors(), async (req, res) => {
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

export default usersRouter;
