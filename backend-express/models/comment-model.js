import mongoose, { Schema } from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    comment: { type: String },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
      required: true,
    },
  },
  { timestamps: true }
);

export const CommentModel = mongoose.model("comments", commentSchema);
