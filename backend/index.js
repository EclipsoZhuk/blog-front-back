import express from "express";
import cors from "cors";
import multer from "multer";
import mongoose from "mongoose";
import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from "./validations.js";

import { handleValidationError, checkAuth } from "./utils/index.js";

import { UserController, PostController } from "./controllers/index.js";

mongoose
  .connect(
    "mongodb+srv://eclipsozhuk:i1fTzhSmFGfpuHdI@eclipsozhukcluster.16kug.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB OK"))
  .catch((err) => console.log("DB error", err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.post(
  "/auth/register",
  registerValidation,
  handleValidationError,
  UserController.register
);
app.post(
  "/auth/login",
  loginValidation,
  handleValidationError,
  UserController.login
);
app.get("/auth/me", checkAuth, UserController.getMe);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get("/posts", PostController.getAll);
app.get("/posts/tags", PostController.getLastTags);
app.get("/posts/:id", PostController.getOne);
app.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  handleValidationError,
  PostController.create
);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch(
  "/posts/:id",
  checkAuth,
  postCreateValidation,
  handleValidationError,
  PostController.update
);

app.listen(8080, (err) => {
  if (err) console.log(err);
  console.log("Port 8080");
  console.log("Server OK");
});
