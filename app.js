import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import postsRoutes from "./routes/postsRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import cors from "cors";

const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/auth", authRoutes);
app.use("/posts", postsRoutes);
app.use("/users", usersRoutes);
app.use(express.static(__dirname));
postsRoutes.use(cors());
usersRoutes.use(cors());
authRoutes.use(cors());

mongoose.set("strictQuery", false);

async function start() {
  try {
    await mongoose.connect(
      "mongodb+srv://Kara:123@cluster0.pse1sut.mongodb.net/NodeJsSite",
      {
        useNewUrlParser: true,
      }
    );
    app.listen(PORT, () => {
      console.log("Server is running...");
    });
  } catch (err) {
    console.log(err);
  }
}

start();
