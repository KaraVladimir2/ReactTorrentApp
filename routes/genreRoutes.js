import { Router } from "express";
const genreRouter = Router();
import genreModel from "../Models/genreModel.js";
import cors from "cors";

genreRouter.get("/getGenre", cors(), async (req, res) => {
  try {
    await genreModel.find().exec(function (err, data) {
      res.json({ success: true, data });
    });
  } catch (error) {
    res.json({ success: false, message: "Something went wrong" });
  }
});

genreRouter.post("/addGenre", cors(), async (req, res) => {
  const { newGenre } = req.body;
  const genreToAdd = new genreModel({
    title: newGenre,
  });
  try {
    await genreToAdd.save();
    res.json({ success: true, message: "Genre has been added" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "Something went wrong" });
  }
});

export default genreRouter;
