import { Router } from "express";
const postsRouter = Router();
import multer from "multer";
import postModel from "../Models/postModel.js";
import cors from "cors";

const upload = multer({ storage: multer.memoryStorage() });

postsRouter.post(
  "/postSend",
  [upload.array("myImage"), cors()],
  async (req, res) => {
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
  }
);

postsRouter.post("/deletePost", cors(), async (req, res) => {
  const { id } = req.body;

  try {
    await postModel.deleteOne({ _id: id });
    res.json({ success: true, message: "Post has been deleted" });
  } catch (error) {
    res.json({ success: false, message: "Something went wrong" });
  }
});

postsRouter.post("/postComment", cors(), async (req, res) => {
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

postsRouter.post("/getPosts", cors(), async (req, res) => {
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

postsRouter.post("/getPostById", cors(), async (req, res) => {
  const { id } = req.body;
  try {
    postModel.updateOne({ _id: id }, { $inc: { views: 1 } }, (err, data) => {});
    await postModel
      .findOne({ _id: id }, (err, data) => {
        res.json({ success: true, data: data });
      })
      .clone();
  } catch (error) {
    res.json({ success: false, message: "Something went wrong" });
  }
});

export default postsRouter;
