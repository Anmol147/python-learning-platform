import mongoose from "mongoose";
import dotenv from "dotenv";
import Topic from "../models/Topic.js";
import Problem from "../models/Problem.js";

dotenv.config();

const topicData = [
  {
    title: "Python Basics",
    slug: "python-basics",
    description: "Learn variables, data types, output, and basic Python syntax.",
    order: 1,
    lessons: [
      { title: "Variables", content: "Store values in named containers using assignment statements." },
      { title: "Print Statements", content: "Use print to display values and messages." },
      { title: "Data Types", content: "Understand strings, integers, floats, and booleans." }
    ]
  },
  {
    title: "Control Flow",
    slug: "control-flow",
    description: "Use conditions and loops to make your programs react to input.",
    order: 2,
    lessons: [
      { title: "If Statements", content: "Run code only when a condition is true." },
      { title: "Loops", content: "Repeat actions using for and while loops." },
      { title: "Comparisons", content: "Use operators like ==, <, and > to compare values." }
    ]
  },
  {
    title: "Functions",
    slug: "functions",
    description: "Break code into reusable blocks that can be called multiple times.",
    order: 3,
    lessons: [
      { title: "Defining Functions", content: "Use def to create reusable code blocks." },
      { title: "Parameters", content: "Pass values into a function for flexible behavior." },
      { title: "Return Values", content: "Send a result back to the caller." }
    ]
  }
];

const problemData = [
  {
    title: "Print Hello World",
    slug: "print-hello-world",
    description: "Print the text Hello World! to the console.",
    topicSlug: "python-basics",
    difficulty: "easy",
    constraints: ["Use Python print()"],
    inputFormat: "None",
    outputFormat: "Print Hello World!",
    examples: [
      {
        input: "",
        output: "Hello World!",
        explanation: "The program prints the required text."
      }
    ],
    starterCode: "print(\"Hello World!\")\n",
    hints: [
      { level: 1, text: "Use the print function to display text." },
      { level: 2, text: "Remember to include the text inside quotes." }
    ],
    solution: "print(\"Hello World!\")\n",
    explanation: "The print() function displays output in the terminal.",
    tags: ["output", "basics"],
    isPublished: true
  },
  {
    title: "Add Two Numbers",
    slug: "add-two-numbers",
    description: "Read two numbers and print their sum.",
    topicSlug: "python-basics",
    difficulty: "easy",
    constraints: ["The numbers are integers."],
    inputFormat: "Two integers on separate lines.",
    outputFormat: "Their sum.",
    examples: [
      {
        input: "5\n7",
        output: "12",
        explanation: "5 + 7 = 12."
      }
    ],
    starterCode: "a = int(input())\nb = int(input())\nprint(a + b)\n",
    hints: [
      { level: 1, text: "Convert the input strings into integers before adding them." },
      { level: 2, text: "Use input() and int() to read the values." }
    ],
    solution: "a = int(input())\nb = int(input())\nprint(a + b)\n",
    explanation: "The program reads two numbers, converts them to integers, and prints the total.",
    tags: ["input", "math"],
    isPublished: true
  },
  {
    title: "Check Even or Odd",
    slug: "check-even-or-odd",
    description: "Print Even if the number is divisible by 2, otherwise print Odd.",
    topicSlug: "control-flow",
    difficulty: "easy",
    constraints: ["Use the modulo operator."],
    inputFormat: "One integer.",
    outputFormat: "Even or Odd.",
    examples: [
      {
        input: "4",
        output: "Even",
        explanation: "4 is divisible by 2."
      }
    ],
    starterCode: "n = int(input())\nif n % 2 == 0:\n    print(\"Even\")\nelse:\n    print(\"Odd\")\n",
    hints: [
      { level: 1, text: "Use an if statement to check divisibility by 2." },
      { level: 2, text: "The modulo operator (%) gives the remainder." }
    ],
    solution: "n = int(input())\nif n % 2 == 0:\n    print(\"Even\")\nelse:\n    print(\"Odd\")\n",
    explanation: "Testing divisibility by 2 is the key idea.",
    tags: ["conditionals", "modulo"],
    isPublished: true
  },
  {
    title: "Positive or Negative",
    slug: "positive-or-negative",
    description: "Print Positive if the number is greater than zero, Negative if less than zero, and Zero otherwise.",
    topicSlug: "control-flow",
    difficulty: "easy",
    constraints: ["Use comparison operators."],
    inputFormat: "One integer.",
    outputFormat: "Positive, Negative, or Zero.",
    examples: [
      {
        input: "-3",
        output: "Negative",
        explanation: "-3 is less than zero."
      }
    ],
    starterCode: "n = int(input())\nif n > 0:\n    print(\"Positive\")\nelif n < 0:\n    print(\"Negative\")\nelse:\n    print(\"Zero\")\n",
    hints: [
      { level: 1, text: "Check if the value is greater than zero first." },
      { level: 2, text: "Add an elif branch for negative values." }
    ],
    solution: "n = int(input())\nif n > 0:\n    print(\"Positive\")\nelif n < 0:\n    print(\"Negative\")\nelse:\n    print(\"Zero\")\n",
    explanation: "This exercise practices simple branching logic.",
    tags: ["if", "comparisons"],
    isPublished: true
  },
  {
    title: "Sum of First N Numbers",
    slug: "sum-of-first-n-numbers",
    description: "Read a number n and print the sum from 1 to n.",
    topicSlug: "control-flow",
    difficulty: "medium",
    constraints: ["Use a loop."],
    inputFormat: "One integer n.",
    outputFormat: "Sum of 1 to n.",
    examples: [
      {
        input: "5",
        output: "15",
        explanation: "1 + 2 + 3 + 4 + 5 = 15."
      }
    ],
    starterCode: "n = int(input())\nresult = 0\nfor number in range(1, n + 1):\n    result += number\nprint(result)\n",
    hints: [
      { level: 1, text: "Use a loop to add each number in the range." },
      { level: 2, text: "Initialize a total variable before the loop." }
    ],
    solution: "n = int(input())\nresult = 0\nfor number in range(1, n + 1):\n    result += number\nprint(result)\n",
    explanation: "The loop accumulates the total as it goes through the numbers.",
    tags: ["loops", "sum"],
    isPublished: true
  },
  {
    title: "Multiply by 2",
    slug: "multiply-by-2",
    description: "Write a function that takes a number and returns double its value.",
    topicSlug: "functions",
    difficulty: "easy",
    constraints: ["Define a function using def."],
    inputFormat: "One integer.",
    outputFormat: "Double the input value.",
    examples: [
      {
        input: "7",
        output: "14",
        explanation: "7 multiplied by 2 is 14."
      }
    ],
    starterCode: "def double_value(number):\n    return number * 2\n\nvalue = int(input())\nprint(double_value(value))\n",
    hints: [
      { level: 1, text: "Create a function with one parameter." },
      { level: 2, text: "Return the parameter multiplied by 2." }
    ],
    solution: "def double_value(number):\n    return number * 2\n\nvalue = int(input())\nprint(double_value(value))\n",
    explanation: "This problem shows how functions can make code reusable.",
    tags: ["functions", "return"],
    isPublished: true
  },
  {
    title: "Add Two Numbers with Function",
    slug: "add-two-numbers-with-function",
    description: "Create a function that adds two numbers and returns the result.",
    topicSlug: "functions",
    difficulty: "easy",
    constraints: ["Define a function with two parameters."],
    inputFormat: "Two integers.",
    outputFormat: "Their sum.",
    examples: [
      {
        input: "3\n9",
        output: "12",
        explanation: "3 + 9 = 12."
      }
    ],
    starterCode: "def add_numbers(a, b):\n    return a + b\n\nfirst = int(input())\nsecond = int(input())\nprint(add_numbers(first, second))\n",
    hints: [
      { level: 1, text: "Write a function with two inputs." },
      { level: 2, text: "Use return to send the total back." }
    ],
    solution: "def add_numbers(a, b):\n    return a + b\n\nfirst = int(input())\nsecond = int(input())\nprint(add_numbers(first, second))\n",
    explanation: "Functions can accept arguments and return computed values.",
    tags: ["functions", "parameters"],
    isPublished: true
  },
  {
    title: "Reverse a String",
    slug: "reverse-a-string",
    description: "Read a word and print it in reverse order.",
    topicSlug: "python-basics",
    difficulty: "medium",
    constraints: ["Use string slicing or a loop."],
    inputFormat: "One string.",
    outputFormat: "The reversed string.",
    examples: [
      {
        input: "python",
        output: "nohtyp",
        explanation: "The letters are printed in reverse order."
      }
    ],
    starterCode: "word = input()\nprint(word[::-1])\n",
    hints: [
      { level: 1, text: "String slicing can reverse a string." },
      { level: 2, text: "Use [::-1] to reverse the sequence." }
    ],
    solution: "word = input()\nprint(word[::-1])\n",
    explanation: "Python makes reversing strings easy with slicing.",
    tags: ["strings", "slicing"],
    isPublished: true
  },
  {
    title: "Count Vowels",
    slug: "count-vowels",
    description: "Count how many vowels appear in a given word.",
    topicSlug: "python-basics",
    difficulty: "medium",
    constraints: ["Count lowercase and uppercase vowels."],
    inputFormat: "One string.",
    outputFormat: "The number of vowels.",
    examples: [
      {
        input: "Python",
        output: "2",
        explanation: "The vowels are o and i, so there are 2."
      }
    ],
    starterCode: "word = input().lower()\ncount = 0\nfor letter in word:\n    if letter in \"aeiou\":\n        count += 1\nprint(count)\n",
    hints: [
      { level: 1, text: "Loop through each letter in the word." },
      { level: 2, text: "Check whether the letter is in the set aeiou." }
    ],
    solution: "word = input().lower()\ncount = 0\nfor letter in word:\n    if letter in \"aeiou\":\n        count += 1\nprint(count)\n",
    explanation: "This solution traverses the string and counts matching vowels.",
    tags: ["loops", "strings"],
    isPublished: true
  },
  {
    title: "Find Maximum Number",
    slug: "find-maximum-number",
    description: "Read three numbers and print the largest one.",
    topicSlug: "control-flow",
    difficulty: "medium",
    constraints: ["Use comparisons or built-in max()."],
    inputFormat: "Three integers.",
    outputFormat: "The largest integer.",
    examples: [
      {
        input: "7\n2\n9",
        output: "9",
        explanation: "9 is greater than 7 and 2."
      }
    ],
    starterCode: "numbers = [int(input()) for _ in range(3)]\nprint(max(numbers))\n",
    hints: [
      { level: 1, text: "Read three inputs and store them in a list." },
      { level: 2, text: "Use max() to find the largest value." }
    ],
    solution: "numbers = [int(input()) for _ in range(3)]\nprint(max(numbers))\n",
    explanation: "The max() function compares all values and returns the highest one.",
    tags: ["lists", "max"],
    isPublished: true
  }
];

const seedDatabase = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing in server/.env");
    }

    await mongoose.connect(process.env.MONGO_URI);

    await Topic.deleteMany({});
    await Problem.deleteMany({});

    const createdTopics = await Topic.insertMany(topicData);
    const topicMap = new Map(createdTopics.map((topic) => [topic.slug, topic._id]));

    const problemsToInsert = problemData.map(({ topicSlug, ...problem }) => ({
      ...problem,
      topicId: topicMap.get(topicSlug),
      createdAt: new Date(),
      tags: problem.tags || []
    }));

    const createdProblems = await Problem.insertMany(problemsToInsert);

    console.log(`Seeded ${createdTopics.length} topics and ${createdProblems.length} problems.`);
    console.log("Database seed complete.");
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

seedDatabase();

export default seedDatabase;
