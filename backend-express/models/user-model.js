import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String },
  phone: { type: String },
  username: { type: String, required: true, unique: true },
  fullname: { type: String, required: true },
  password: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  bio: { type: String },
  profileURL: { type: String },
  postCount: { type: Number, default: 0 },
  followersCount: { type: Number, default: 0 },
  followingsCount: { type: Number, default: 0 },
});
const userModel = mongoose.model("users", userSchema);
export default userModel;
