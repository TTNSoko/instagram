import express from "express";
import PostModel from "../models/post-model.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const posts = await PostModel.find({})
    .populate("user", "email fullname username")
    .sort({ createdAt: -1 });
  return res.send(posts);
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    const { description, mediaURL } = req.body;
    const newPost = await PostModel.create({
      description,
      mediaURL,
      user: user._id,
    });
    return res.send(newPost);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server can not handle that request!" });
  }
});

router.get("/user/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const posts = await PostModel.find({ user: _id });
    return res.send(posts);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server can not handle that request!"});
  }
});

export default router;
