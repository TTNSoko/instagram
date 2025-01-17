import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String },
    phone: { type: String },
    username: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    bio: { type: String },
    profileURL: { type: String },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

userSchema.virtual("posts", {
  ref: "posts",
  localField: "_id",
  foreignField: "user",
});

userSchema.virtual("followers", {
  ref: "follows",
  localField: "_id",
  foreignField: "user",
});

userSchema.virtual("followings", {
  ref: "follows",
  localField: "_id",
  foreignField: "follower",
});

const UserModel = mongoose.model("users", userSchema);
export default UserModel;
