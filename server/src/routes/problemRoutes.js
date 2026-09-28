import express from "express";
import {
  getProblemById,
  getProblemHints,
  getProblems
} from "../controllers/problemController.js";

const router = express.Router();

router.get("/", getProblems);
router.get("/:id", getProblemById);
router.get("/:id/hints", getProblemHints);

export default router;
