import Problem from "../models/Problem.js";
import Topic from "../models/Topic.js";
import mongoose from "mongoose";

const stripHiddenFields = (problem) => {
  if (!problem) return null;

  const publicProblem = { ...problem };

  delete publicProblem.solution;
  delete publicProblem.isPublished;
  delete publicProblem.__v;

  return publicProblem;
};

export const getProblems = async (req, res) => {
  try {
    const { topic, difficulty } = req.query;
    const filters = {};

    if (difficulty) {
      filters.difficulty = String(difficulty).toLowerCase();
    }

    if (topic) {
      const topicQuery = mongoose.Types.ObjectId.isValid(topic)
        ? { $or: [{ _id: topic }, { slug: topic }] }
        : { slug: topic };

      const matchedTopic = await Topic.findOne(topicQuery);

      if (!matchedTopic) {
        return res.status(404).json({
          success: false,
          message: "Topic not found",
        });
      }

      filters.topicId = matchedTopic._id;
    }

    const problems = await Problem.find(filters)
      .sort({ createdAt: -1 })
      .lean();

    const publicProblems = problems.map(stripHiddenFields);

    return res.status(200).json({
      success: true,
      count: publicProblems.length,
      data: publicProblems,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch problems",
      error: error.message,
    });
  }
};

export const getProblemById = async (req, res) => {
  try {
    const { id } = req.params;

    let problem;

    if (mongoose.Types.ObjectId.isValid(id)) {
      problem = await Problem.findOne({
        $or: [{ _id: id }, { slug: id }],
      }).lean();
    } else {
      problem = await Problem.findOne({
        slug: id,
      }).lean();
    }

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: stripHiddenFields(problem),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch problem",
      error: error.message,
    });
  }
};

export const getProblemHints = async (req, res) => {
  try {
    const { id } = req.params;

    let problem;

    if (mongoose.Types.ObjectId.isValid(id)) {
      problem = await Problem.findOne({
        $or: [{ _id: id }, { slug: id }],
      }).lean();
    } else {
      problem = await Problem.findOne({
        slug: id,
      }).lean();
    }

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    return res.status(200).json({
      success: true,
      count: problem.hints?.length || 0,
      data: problem.hints || [],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch hints",
      error: error.message,
    });
  }
}