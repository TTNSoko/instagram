import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { Router } from "express";

dotenv.config();
const router = Router();

cloudinary.config({
  cloud_name: "dh2jsir3a",
  api_key: "819843467596843",
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images/");
  },
  filename: (req, file, cb) => {
    const uniqueName = `${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.use(upload.single("file"));

router.post("/", async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    return res.send({
      message: "Successfully uploaded.",
      filename: result.secure_url,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      message: "Failed to upload!",
    });
  }
});

export default router;
