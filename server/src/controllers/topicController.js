import Topic from "../models/Topic.js";

export const getTopics = async (req, res) => {
  try {
    const topics = await Topic.find().sort({ order: 1 }).lean();

    return res.status(200).json({
      success: true,
      count: topics.length,
      data: topics
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch topics",
      error: error.message
    });
  }
};

export const getTopicById = async (req, res) => {
  try {
    const { id } = req.params;

    const topic = await Topic.findOne({
      $or: [{ _id: id }, { slug: id }]
    }).lean();

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: "Topic not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: topic
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch topic",
      error: error.message
    });
  }
};
