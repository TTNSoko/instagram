import express from "express";
import userModel from "../models/user-model.js";

const router = express.Router();

router.get("/:username", async (req, res) => {
  const { username } = req.params;
  const user = await userModel.findOne({ username });
  return res.send(user);
});

export default router;
