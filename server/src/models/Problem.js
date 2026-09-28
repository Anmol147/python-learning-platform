import mongoose from "mongoose";

const exampleSchema = new mongoose.Schema(
  {
    input: {
      type: String,
      default: ""
    },
    output: {
      type: String,
      default: ""
    },
    explanation: {
      type: String,
      default: ""
    }
  },
  { _id: false }
);

const hintSchema = new mongoose.Schema(
  {
    level: {
      type: Number,
      required: true,
      min: 1
    },
    text: {
      type: String,
      required: true,
      trim: true
    }
  },
  { _id: false }
);

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
      index: true
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "easy",
      lowercase: true
    },
    constraints: [{ type: String, trim: true }],
    inputFormat: {
      type: String,
      default: ""
    },
    outputFormat: {
      type: String,
      default: ""
    },
    examples: [exampleSchema],
    starterCode: {
      type: String,
      required: true,
      default: ""
    },
    hints: [hintSchema],
    solution: {
      type: String,
      default: ""
    },
    explanation: {
      type: String,
      default: ""
    },
    tags: [{ type: String, trim: true, lowercase: true }],
    isPublished: {
      type: Boolean,
      default: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

problemSchema.index({ topicId: 1, difficulty: 1 });

const Problem = mongoose.model("Problem", problemSchema);

export default Problem;
