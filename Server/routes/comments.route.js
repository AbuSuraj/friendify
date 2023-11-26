import express from "express";
import {
  getComments,
  addComment,
  deleteComment,
} from "../controllers/comments.controllers.js";

const router = express.Router();

router.get("/", getComments);
router.post("/", addComment);
router.delete("/:id", deleteComment);

export default router;