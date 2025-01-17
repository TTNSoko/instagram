import express from "express";
import PostModel from "../models/post-model.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";
import { CommentModel } from "../models/comment-model.js";
import { LikeModel } from "../models/like-model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const posts = await PostModel.find({})
    .populate("user", "email fullname username")
    .populate("comments", "user _id comment username fullname")
    .populate("likes", "user username")
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
    console.error(err);
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
    return res
      .status(500)
      .json({ message: "Server can not handle that request!" });
  }
});

router.post("/:postId/comments", authMiddleware, async (req, res) => {
  const { postId } = req.params;
  const user = req.user;
  const { comment } = req.body;
  try {
    const post = await PostModel.findById(postId);

    if (!post) return res.status(404).send("Id not found!");

    const newComment = await CommentModel.create({
      comment,
      post: postId,
      user: user._id,
    });

    return res.send(newComment);
  } catch (error) {
    throw new Error("An error occurred while adding the comment!");
  }
});

router.get("/:postId", async (req, res) => {
  const { postId } = req.params;
  const post = await PostModel.findById(postId);

  if (!post) return res.status(404).send("Id not found!");

  try {
    const post = await PostModel.findById(postId)
      .populate("user", "_id email username fullname")
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "username fullname",
        },
      })
      .populate({
        path: "likes",
        populate: {
          path: "user",
          select: "username fullname",
        },
      })
      .sort({ createdAt: -1 });

    return res.send(post);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post("/:postId/likes", authMiddleware, async (req, res) => {
  try {
    const { postId } = req.params;
    const user = req.user;

    const newLike = await LikeModel.create({
      post: postId,
      user: user._id,
    });

    return res.send(newLike);
  } catch (error) {
    throw new Error("An error occurred while adding the like!");
  }
});

router.delete("/:postId/likes", authMiddleware, async (req, res) => {
  try {
    const { postId } = req.params;
    const user = req.user;

    const deletedLike = await LikeModel.findOneAndDelete({
      post: postId,
      user: user._id,
    });

    return res.send(deletedLike);
  } catch (error) {
    throw new Error("An error occurred while deleting the like!");
  }
});

export default router;
