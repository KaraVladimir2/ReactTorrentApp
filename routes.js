import { Router } from "express";
const router = Router();
import postModel from "./Models/postModel.js";
import cors from "cors";
import multer from "multer";
import url from "url";

const upload = multer({ storage: multer.memoryStorage() });

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
    res.json({ success: false, message: "Something went wrong" });
  }
});

router.post("/getPosts", cors(), async (req, res) => {
  const { page } = req.body;
  try {
    await postModel
      .find()
      .skip((page - 1) * 10)
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

router.get("/getTitleImage", cors(), async (req, res) => {
  const parsedUrl = url.parse(req.url);
  const params = new url.URLSearchParams(parsedUrl.search);
  const id = params.get("id");
  const result = await postModel.findOne({ _id: id });
  res.setHeader("content-type", result.titleImage.ContentType);
  res.send(result.titleImage.Buffer);
});

router.get("/getScreenshots", cors(), async (req, res) => {
  const parsedUrl = url.parse(req.url);
  const params = new url.URLSearchParams(parsedUrl.search);
  const id = params.get("id");
  const post = await postModel.findOne({ _id: id });
  const result = [];
  post.screenshots.map((x) => result.push(x.Buffer));
  res.setHeader("content-type", post.screenshots[0].ContentType);
  res.send(result);
});

router.get("/getTorrentFile", cors(), async (req, res) => {
  const parsedUrl = url.parse(req.url);
  const params = new url.URLSearchParams(parsedUrl.search);
  const id = params.get("id");
  const result = await postModel.findOne({ _id: id });
  res.setHeader("content-type", result.torrentFile.ContentType);
  res.send(result.torrentFile.Buffer);
});

export default router;
