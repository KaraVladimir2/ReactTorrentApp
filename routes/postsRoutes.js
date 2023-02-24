import { Router } from "express";
const postsRouter = Router();
import multer from "multer";
import postModel from "../Models/postModel.js";
import cors from "cors";

const upload = multer({ storage: multer.memoryStorage() });

postsRouter.post(
  "/postSend",
  [upload.array("files"), cors()],
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

    const encodeFiles = [];
    const finalFiles = [];
    req.files.forEach((element) => {
      encodeFiles.push(element.buffer.toString("base64"));
    });

    encodeFiles.forEach((element, index) => {
      finalFiles.push({
        Buffer: Buffer.from(element, "base64"),
        ContentType: req.files[index].mimetype,
      });
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
      titleImage: finalFiles[0],
      screenshots: [finalFiles[1], finalFiles[2], finalFiles[3], finalFiles[4]],
      torrentFile: finalFiles[5],
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
    const comment = { text, owner: username };
    await postModel.updateOne({ _id: id }, { $push: { comments: comment } });
    res.json({ success: true, message: "Comment has been sent" });
  } catch (error) {
    res.json({ success: false, message: "Something went wrong" });
  }
});

postsRouter.post("/deleteComment", cors(), async (req, res) => {
  try {
    const { comment, id } = req.body;
    await postModel.updateOne({ _id: id }, { $pull: { comments: comment } });
    res.json({ success: true, message: "Comment has been deleted" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "Something went wrong" });
  }
});

postsRouter.post("/getPosts", cors(), async (req, res) => {
  const { page, limit } = req.body;
  let totalPostCount = 0;
  try {
    await postModel
      .find(
        {},
        "_id title genre description features requirements shortInfo installation size titleImage postDate views"
      )
      .sort({ _id: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec(function (err, data) {
        postModel.countDocuments({}, (err, total) => {
          totalPostCount = total;
        });
        const newArrray = data.map((obj) => {
          return { _id: obj._id.toString(), ...obj._doc };
        });
        res.json({ success: true, data: { data: newArrray, totalPostCount } });
      });
  } catch (error) {
    res.json({ success: false, message: "Something went wrong" });
  }
});

postsRouter.post("/getPostById", cors(), async (req, res) => {
  const { id } = req.body;
  try {
    postModel.updateOne({ _id: id }, { $inc: { views: 1 } }, (err, data) => {
      postModel.findOne({ _id: id }, (err, data) => {
        data.comments.sort((a, b) => b.date - a.date);
        res.json({ success: true, data: data });
      });
    });
  } catch (error) {
    res.json({ success: false, message: "Something went wrong" });
  }
});

export default postsRouter;
