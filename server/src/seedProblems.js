import "dotenv/config";
import mongoose from "mongoose";

import connectDB from "./config/db.js";
import Problem from "./models/Problem.js";
import Topic from "./models/Topic.js";

const seedProblems = async () => {
  try {
    await connectDB();

    let topic = await Topic.findOne({ slug: "python-basics" });

    if (!topic) {
      topic = await Topic.create({
        title: "Python Basics",
        slug: "python-basics",
        description: "Learn the fundamentals of Python programming.",
        order: 1,
        lessons: []
      });

      console.log("Python Basics topic created.");
    }

    const problems = [
      {
        title: "Print Hello World",
        slug: "print-hello-world",
        description: "Write a Python program that prints Hello World.",
        topicId: topic._id,
        difficulty: "easy",
        constraints: [],
        inputFormat: "No input.",
        outputFormat: "Print Hello World.",
        examples: [
          {
            input: "",
            output: "Hello World",
            explanation: "The program should print Hello World."
          }
        ],
        starterCode: "print()",
        hints: [
          {
            level: 1,
            text: "Use Python's print() function."
          }
        ],
        solution: 'print("Hello World")',
        explanation: "The print() function displays text on the screen.",
        tags: ["python", "basics", "print"],
        isPublished: true
      },

      {
        title: "Add Two Numbers",
        slug: "add-two-numbers",
        description: "Write a program that takes two numbers and prints their sum.",
        topicId: topic._id,
        difficulty: "easy",
        constraints: [
          "The input contains two integers."
        ],
        inputFormat: "Two integers separated by a space.",
        outputFormat: "Print their sum.",
        examples: [
          {
            input: "5 7",
            output: "12",
            explanation: "5 + 7 = 12"
          }
        ],
        starterCode: "a, b = map(int, input().split())\n# Write your code here",
        hints: [
          {
            level: 1,
            text: "Use input().split() to read two values."
          },
          {
            level: 2,
            text: "Convert the values to integers using int()."
          }
        ],
        solution: "a, b = map(int, input().split())\nprint(a + b)",
        explanation: "Read two integers and print their sum.",
        tags: ["python", "input", "operators"],
        isPublished: true
      },

      {
        title: "Check Even or Odd",
        slug: "check-even-or-odd",
        description: "Write a program to determine whether a number is even or odd.",
        topicId: topic._id,
        difficulty: "easy",
        constraints: [
          "The input contains one integer."
        ],
        inputFormat: "One integer.",
        outputFormat: "Print Even if the number is even, otherwise print Odd.",
        examples: [
          {
            input: "8",
            output: "Even",
            explanation: "8 is divisible by 2."
          },
          {
            input: "7",
            output: "Odd",
            explanation: "7 is not divisible by 2."
          }
        ],
        starterCode: "n = int(input())\n# Write your code here",
        hints: [
          {
            level: 1,
            text: "Use the modulo operator %."
          },
          {
            level: 2,
            text: "A number is even when n % 2 == 0."
          }
        ],
        solution: 'n = int(input())\n\nif n % 2 == 0:\n    print("Even")\nelse:\n    print("Odd")',
        explanation: "The modulo operator checks the remainder after division by 2.",
        tags: ["python", "if-else", "operators"],
        isPublished: true
      }
    ];

    for (const problem of problems) {
      await Problem.updateOne(
        { slug: problem.slug },
        { $set: problem },
        { upsert: true }
      );
    }

    console.log("✅ Problems seeded successfully.");

    const count = await Problem.countDocuments();

    console.log(`Total problems in database: ${count}`);

    await mongoose.connection.close();
  } catch (error) {
    console.error("❌ Seed failed:", error.message);
    process.exit(1);
  }
};

seedProblems();