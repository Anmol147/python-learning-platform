import express from "express";
import { getTopicById, getTopics } from "../controllers/topicController.js";

const router = express.Router();

router.get("/", getTopics);
router.get("/:id", getTopicById);

export default router;
