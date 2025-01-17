import express from "express";
import bcrypt from "bcrypt";
import UserModel from "../models/user-model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { authMiddleware } from "../middlewares/auth-middleware.js";

dotenv.config();

const sign = express.Router();

const checkPhoneNumber = (credential) => {
  if (credential.length !== 8) return false;
  if (isNaN(Number(credential))) return false;
  const firstNumber = credential[0];
  if (!["9", "8", "7", "6"].includes(firstNumber)) return false;
  return true;
};

const checkEmail = (credential) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(credential);
};

sign.post("/signup", async (req, res) => {
  const { credential, password, username, fullname } = req.body;
  if (!credential || credential === "") {
    return res.status(400).send({ message: "Email or Phone required!" });
  }
  if (!password || password === "") {
    return res.status(400).send({ message: "Password required!" });
  }
  if (!fullname || fullname === "") {
    return res.status(400).send({ message: "Fullname required!" });
  }
  if (!username || username === "") {
    return res.status(400).send({ message: "Username required!" });
  }

  if (password.length < 7) {
    return res.status(400).send({
      message: "Your password must have 8 or more charachters.",
    });
  }

  const existingUser = await UserModel.findOne({ username: username });
  if (existingUser) {
    return res
      .status(400)
      .send({ message: "Your username is already registered!" });
  }

  const isPhoneNumber = checkPhoneNumber(credential);
  const isEmail = checkEmail(credential);

  if (!isPhoneNumber && !isEmail) {
    return res
      .status(400)
      .send({ message: "Please! Enter only email or phone number." });
  }

  if (isPhoneNumber) {
    const existingUser = await UserModel.findOne({ phone: credential });
    if (existingUser) {
      return res
        .status(400)
        .send({ message: "Your phone number is already registered!" });
    } else {
      bcrypt.hash(password, 10, async function (err, hash) {
        const newUser = {
          phone: credential,
          fullname: fullname,
          password: hash,
          username: username,
        };
        await UserModel.create(newUser);
        return res.status(201).send(newUser);
      });
    }
  }

  if (isEmail) {
    const existingUser = await UserModel.findOne({ email: credential });
    if (existingUser) {
      return res
        .status(400)
        .send({ message: "Your email is already registered!" });
    } else {
      bcrypt.hash(password, 10, async function (err, hash) {
        const newUser = {
          email: credential,
          fullname: fullname,
          password: hash,
          username: username,
        };
        await UserModel.create(newUser);
        return res.status(201).send(newUser);
      });
    }
  }
});

sign.post("/signin", async (req, res) => {
  const { credential, password } = req.body;
  let existingUser = null;

  if (checkPhoneNumber(credential)) {
    existingUser = await UserModel.findOne({ phone: credential });
  } else if (checkEmail(credential)) {
    existingUser = await UserModel.findOne({ email: credential });
  } else {
    existingUser = await UserModel.findOne({ username: credential });
  }

  if (!existingUser)
    return res
      .status(400)
      .send({ message: "Credential or password is wrong." });

  bcrypt.compare(password, existingUser.password, function (err, result) {
    if (!result) {
      return res.status(400).send({ message: "Email or password is wrong." });
    } else {
      const accessToken = jwt.sign(
        {
          user: existingUser,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "10h",
        }
      );
      return res.status(200).send({ message: "Welcome.", accessToken });
    }
  });
});

sign.get("/me", authMiddleware, (req, res) => {
  return res.send(req.user);
});

sign.post("/me", authMiddleware, (req, res) => {});

export default sign;
