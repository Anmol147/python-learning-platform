# Python Learning Platform — MERN Architecture

## 1. Project Overview

A beginner-friendly Python learning platform where users can:

- Learn Python topics
- Solve coding problems
- Write Python code in a browser
- Run code against test cases
- See passed/failed test cases
- Get progressive hints
- Track learning progress
- View solved/attempted problems
- Eventually receive AI-powered learning assistance

The application will use the MERN stack:

- **MongoDB** — database
- **Express.js** — backend API
- **React.js** — frontend
- **Node.js** — backend runtime

Python code execution is a separate service/process because the MERN backend itself is JavaScript.

---

# 2. High-Level Architecture

```text
                         ┌──────────────────────┐
                         │      React App       │
                         │                      │
                         │  Dashboard           │
                         │  Topics              │
                         │  Problems            │
                         │  Code Editor         │
                         │  Hints               │
                         │  Progress            │
                         └──────────┬───────────┘
                                    │
                              REST API / JSON
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   Express + Node.js  │
                         │                      │
                         │ Auth API             │
                         │ Topic API            │
                         │ Problem API          │
                         │ Submission API       │
                         │ Progress API         │
                         └───────┬──────┬───────┘
                                 │      │
                     ┌───────────┘      └──────────────┐
                     ▼                                 ▼
          ┌─────────────────────┐          ┌──────────────────────┐
          │      MongoDB        │          │ Python Code Runner   │
          │                     │          │                      │
          │ Users               │          │ Sandboxed execution  │
          │ Topics              │          │ Test cases           │
          │ Problems            │          │ Timeout              │
          │ Test Cases          │          │ Output limits        │
          │ Submissions         │          └──────────────────────┘
          │ Progress            │
          └─────────────────────┘
```

---

# 3. Recommended Technology Stack

## Frontend

- React
- React Router
- Axios
- CSS Modules or plain CSS initially
- Monaco Editor for the coding editor
- Context API initially for authentication/global state

## Backend

- Node.js
- Express.js
- Mongoose
- JWT authentication
- bcrypt/bcryptjs for password hashing
- dotenv
- express-validator or Zod for validation

## Database

- MongoDB
- MongoDB Atlas for deployment

## Python Execution

For the first development version:

- Node.js `child_process.spawn()` can be used carefully for local development.

For production:

- Execute submissions inside isolated Docker containers/sandboxes.
- Apply CPU, memory, execution-time, process-count, filesystem, and output limits.
- Never execute arbitrary user code directly inside the main API server.

## Development Tools

- VS Code
- Git
- GitHub
- Postman or Thunder Client
- npm

---

# 4. Main Features

## Authentication

- Register
- Login
- Logout
- JWT authentication
- Protected dashboard
- Password hashing

## Learning Topics

Example:

```text
Python Basics
├── Variables
├── Data Types
├── Operators
├── Conditions
├── Loops
├── Functions
├── Strings
├── Lists
├── Tuples
├── Sets
├── Dictionaries
├── File Handling
└── OOP
```

Each topic contains:

- Explanation
- Examples
- Related problems
- Completion status

## Coding Problems

Each problem contains:

- Title
- Description
- Topic
- Difficulty
- Constraints
- Input format
- Output format
- Examples
- Starter code
- Hidden test cases
- Public test cases
- Progressive hints
- Official solution/explanation

Difficulty:

```text
Easy
Medium
Hard
```

## Code Editor

The user can:

- Write Python
- Run code
- Submit code
- Reset starter code
- View output
- View errors
- View test results

## Test Cases

Example:

```text
Input:
5
10

Expected:
15
```

Result:

```text
Test 1    Passed
Test 2    Passed
Test 3    Failed
```

Do not expose hidden test-case input/output to the user.

## Hint System

Hints should be progressive:

```text
Hint 1 → Conceptual direction
Hint 2 → More specific guidance
Hint 3 → Almost the implementation approach
Solution → Full solution
```

The platform should not immediately reveal the answer when the user asks for a hint.

## Progress Tracking

Track:

- Problems attempted
- Problems solved
- Problems failed
- Topics completed
- Current streak
- Difficulty statistics
- Recent submissions

Example:

```text
Python Progress
███████░░░ 70%

Solved: 35
Attempted: 47

Easy:   25
Medium:  8
Hard:    2
```

---

# 5. MERN Folder Architecture

Recommended structure:

```text
python-learning-platform/
│
├── client/
│   ├── public/
│   │
│   └── src/
│       ├── assets/
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── Sidebar.jsx
│       │   ├── ProblemCard.jsx
│       │   ├── CodeEditor.jsx
│       │   ├── TestResult.jsx
│       │   ├── HintPanel.jsx
│       │   ├── ProgressBar.jsx
│       │   └── ProtectedRoute.jsx
│       │
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   ├── Dashboard.jsx
│       │   ├── Topics.jsx
│       │   ├── TopicDetails.jsx
│       │   ├── Problems.jsx
│       │   ├── ProblemDetails.jsx
│       │   ├── Profile.jsx
│       │   └── NotFound.jsx
│       │
│       ├── services/
│       │   └── api.js
│       │
│       ├── context/
│       │   └── AuthContext.jsx
│       │
│       ├── hooks/
│       │
│       ├── utils/
│       │
│       ├── App.jsx
│       ├── main.jsx
│       └── index.css
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   │
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Topic.js
│   │   │   ├── Problem.js
│   │   │   ├── Submission.js
│   │   │   └── Progress.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── topicController.js
│   │   │   ├── problemController.js
│   │   │   ├── submissionController.js
│   │   │   └── progressController.js
│   │   │
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── topicRoutes.js
│   │   │   ├── problemRoutes.js
│   │   │   ├── submissionRoutes.js
│   │   │   └── progressRoutes.js
│   │   │
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js
│   │   │   ├── errorMiddleware.js
│   │   │   └── validationMiddleware.js
│   │   │
│   │   ├── services/
│   │   │   ├── codeRunner.js
│   │   │   ├── testRunner.js
│   │   │   └── progressService.js
│   │   │
│   │   ├── utils/
│   │   │
│   │   ├── seed/
│   │   │   └── seedProblems.js
│   │   │
│   │   └── server.js
│   │
│   └── .env
│
├── docker/
│   └── python-runner/
│       └── Dockerfile
│
├── README.md
├── .gitignore
└── package.json
```

---

# 6. MongoDB Data Models

## User

```js
{
  username: String,
  email: String,
  passwordHash: String,
  role: String,
  createdAt: Date
}
```

Roles:

```text
user
admin
```

## Topic

```js
{
  title: String,
  slug: String,
  description: String,
  order: Number,
  lessons: [
    {
      title: String,
      content: String
    }
  ]
}
```

## Problem

```js
{
  title: String,
  slug: String,
  description: String,
  topicId: ObjectId,
  difficulty: String,
  constraints: [String],
  inputFormat: String,
  outputFormat: String,
  examples: [
    {
      input: String,
      output: String,
      explanation: String
    }
  ],
  starterCode: String,
  hints: [
    {
      level: Number,
      text: String
    }
  ],
  solution: String,
  explanation: String,
  tags: [String],
  createdAt: Date
}
```

Important:

- Hidden test cases should not be returned by public problem APIs.
- The solution should not be returned until the user explicitly requests it or completes the intended learning flow.

## TestCase

A separate collection is preferable for hidden tests:

```js
{
  problemId: ObjectId,
  input: String,
  expectedOutput: String,
  isHidden: Boolean
}
```

## Submission

```js
{
  userId: ObjectId,
  problemId: ObjectId,
  code: String,
  status: String,
  passedTests: Number,
  totalTests: Number,
  executionTime: Number,
  error: String,
  createdAt: Date
}
```

Possible status values:

```text
accepted
wrong_answer
runtime_error
time_limit
compile_error
```

## Progress

```js
{
  userId: ObjectId,
  problemId: ObjectId,
  status: String,
  attempts: Number,
  hintsUsed: Number,
  solvedAt: Date,
  lastAttemptAt: Date
}
```

---

# 7. API Architecture

Base URL:

```text
/api
```

## Authentication

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

## Topics

```text
GET /api/topics
GET /api/topics/:id
```

## Problems

```text
GET /api/problems
GET /api/problems/:id
GET /api/problems?topic=loops
GET /api/problems?difficulty=easy
```

## Code Execution

```text
POST /api/submissions/run
POST /api/submissions/submit
GET  /api/submissions/:id
GET  /api/submissions/history
```

## Hints

```text
GET /api/problems/:id/hints
```

The API should reveal hints progressively rather than returning every hint at once.

## Progress

```text
GET /api/progress
GET /api/progress/:problemId
```

---

# 8. Code Execution Flow

```text
User writes Python
        ↓
Click Run
        ↓
React sends code + problem ID
        ↓
Express validates request
        ↓
Code Runner creates isolated execution environment
        ↓
Python program receives test input
        ↓
Program executes
        ↓
Timeout / resource checks
        ↓
Output captured
        ↓
Output normalized
        ↓
Compared with expected output
        ↓
Test results returned
        ↓
React displays results
```

---

# 9. Code Runner Safety

This is a critical security requirement.

Never execute arbitrary user Python code directly in the Node.js API process.

Avoid:

```js
eval(userCode)
```

and do not use unrestricted execution on the production host.

Production architecture:

```text
Node API
   ↓
Job / execution request
   ↓
Isolated Docker container
   ↓
Python process
   ↓
Resource limits
   ↓
Result
   ↓
Node API
```

Apply:

- Execution timeout
- Memory limit
- CPU limit
- Output-size limit
- Process limit
- Restricted filesystem
- No access to application secrets
- No access to MongoDB credentials
- No host networking unless explicitly required
- Cleanup after every execution

For the MVP, keep execution local/development-only if a secure sandbox is not implemented yet.

---

# 10. Edge Cases

## User input

Handle:

- Empty input
- Missing input
- Multiple lines
- Negative numbers
- Zero
- Very large values
- Unicode input

## Code execution

Handle:

- Syntax errors
- Runtime errors
- Infinite loops
- Timeouts
- Excessive output
- Program with no output
- Program waiting forever for input
- Memory-heavy programs
- Invalid Python code

## Test comparison

Consider:

- Trailing spaces
- Leading/trailing newlines
- Multiple spaces
- Different newline formats
- Exact string output
- Numeric output formatting

Do not silently accept genuinely incorrect output.

## Application

Handle:

- Invalid problem ID
- Missing authentication token
- Expired JWT
- Duplicate email
- Duplicate username
- Invalid request body
- Database unavailable
- Code runner unavailable
- Rate limiting
- Unauthorized access

---

# 11. Frontend Pages

## Public

```text
/
├── Home
├── Login
└── Register
```

## Protected

```text
/dashboard
/topics
/topics/:id
/problems
/problems/:id
/profile
/submissions
```

---

# 12. Problem Page UI

Recommended layout:

```text
┌───────────────────────────────────────────────────────────┐
│ Navbar                                                    │
├───────────────────────┬───────────────────────────────────┤
│ Problem               │ Python Editor                    │
│                       │                                   │
│ Title                 │ [Code]                           │
│ Difficulty            │                                   │
│ Description           │                                   │
│ Examples              │                                   │
│ Constraints           │                                   │
│                       │                                   │
│ 💡 Hint               │                                   │
│                       │                                   │
│                       │ [Run] [Submit] [Reset]            │
├───────────────────────┴───────────────────────────────────┤
│ Test Results                                              │
│                                                           │
│ Test 1  ✅ Passed                                         │
│ Test 2  ✅ Passed                                         │
│ Test 3  ❌ Failed                                         │
└───────────────────────────────────────────────────────────┘
```

Use responsive design so the editor and problem statement work on smaller screens.

---

# 13. Progress Dashboard

```text
Welcome back!

Python Progress
████████░░ 80%

Problems Solved
42

Problems Attempted
57

Current Streak
7 days

Topic Progress

Variables       ██████████ 100%
Conditions      █████████░ 90%
Loops           ███████░░░ 70%
Functions       █████░░░░░ 50%
Lists           ██░░░░░░░░ 20%
```

---

# 14. MVP Development Order

Build in this order:

## Step 1

Create MERN project.

```text
client/
server/
```

Make sure React can communicate with Express.

## Step 2

Connect MongoDB.

## Step 3

Create Topic and Problem models.

## Step 4

Create seed data.

Start with approximately 10 beginner problems:

```text
1. Print Hello World
2. Add Two Numbers
3. Calculate Rectangle Area
4. Check Even or Odd
5. Find Largest of Two Numbers
6. Check Positive/Negative
7. Print Numbers 1 to N
8. Sum Numbers 1 to N
9. Count Vowels
10. Reverse a String
```

## Step 5

Build Problems page.

## Step 6

Build Problem Details page.

## Step 7

Add Monaco Editor.

## Step 8

Build the code execution service.

## Step 9

Add test-case evaluation.

## Step 10

Add progressive hints.

## Step 11

Add authentication.

## Step 12

Add progress tracking.

## Step 13

Build dashboard.

## Step 14

Add polish, validation, error handling, and responsive UI.

---

# 15. Suggested Development Rule

Do not build all features simultaneously.

Every stage should produce a working application.

```text
MERN Setup
   ↓
Database
   ↓
Problems
   ↓
Problem UI
   ↓
Code Editor
   ↓
Code Runner
   ↓
Test Cases
   ↓
Hints
   ↓
Authentication
   ↓
Progress
   ↓
Dashboard
```

---

# 16. Future Features

After the MVP works:

- AI hint assistant
- AI code explanation
- Personalized problem recommendations
- Daily challenge
- Streaks
- Badges
- Leaderboard
- Quizzes
- Python lessons
- Search and filters
- Bookmark problems
- Submission history
- Dark mode
- Admin dashboard
- Problem creation interface
- Multiple programming languages

Do not implement these in the first version.

---

# 17. Initial Prompt for Coding Agent

Copy the following prompt into your coding agent:

---

## CODING AGENT PROMPT

You are an experienced full-stack developer helping me build a beginner-friendly Python learning platform.

I am a beginner programmer, so keep the code clean, simple, readable, and well structured. Do not over-engineer the project.

### Goal

Build a MERN-stack web application where users can learn Python and practice coding problems.

The first MVP must allow a user to:

1. View Python topics.
2. View coding problems.
3. Open a problem.
4. Read the problem statement.
5. Write Python code in a browser editor.
6. Run the code against test cases.
7. See which test cases passed or failed.
8. Request progressive hints.
9. Submit a solution.
10. Track solved/attempted problems.
11. View basic progress on a dashboard.

### Required stack

Frontend:

- React
- React Router
- Axios
- Monaco Editor
- CSS

Backend:

- Node.js
- Express.js
- Mongoose
- JWT
- bcrypt/bcryptjs
- dotenv

Database:

- MongoDB

Python execution:

- Build a separate code-runner service/module.
- For local development, a controlled subprocess implementation is acceptable.
- Design the code so it can later be moved to Docker sandbox execution.
- Never use eval() or execute arbitrary Python inside the Node.js process.
- Never expose MongoDB credentials or server environment variables to submitted code.

### Project structure

Create:

```text
python-learning-platform/
├── client/
└── server/
```

Use a clean separation between:

- routes
- controllers
- models
- middleware
- services
- utilities

### Backend models

Create:

1. User
2. Topic
3. Problem
4. TestCase
5. Submission
6. Progress

Problem should contain:

- title
- slug
- description
- topic
- difficulty
- constraints
- input format
- output format
- examples
- starter code
- hints
- solution
- explanation
- tags

Test cases must support hidden and public test cases.

Do not send hidden test cases to the frontend.

### Authentication

Implement:

- Register
- Login
- JWT authentication
- Password hashing
- Protected routes
- Current-user endpoint

Do not store plaintext passwords.

### API

Implement:

```text
POST /api/auth/register
POST /api/auth/login
GET /api/auth/me

GET /api/topics
GET /api/topics/:id

GET /api/problems
GET /api/problems/:id

POST /api/submissions/run
POST /api/submissions/submit
GET /api/submissions/history

GET /api/problems/:id/hints

GET /api/progress
GET /api/progress/:problemId
```

Add proper validation and error handling.

### Frontend pages

Create:

```text
Home
Login
Register
Dashboard
Topics
Topic Details
Problems
Problem Details
Profile
Submission History
```

### Problem page

Use a two-panel desktop layout:

Left:

- Problem title
- Difficulty
- Description
- Examples
- Constraints
- Hints

Right:

- Monaco Python editor
- Run button
- Submit button
- Reset button
- Output
- Test results

Make it responsive for smaller screens.

### Test result UI

Display:

```text
Test 1   Passed
Test 2   Passed
Test 3   Failed
```

For failed tests, show useful information without exposing hidden test data.

Show:

- status
- execution time
- error message when appropriate
- expected output only for public tests
- actual output when safe

### Hint system

Hints must be progressive.

Example:

```text
Hint 1:
Think about how input() works.

Hint 2:
You may need to convert the input to an integer.

Hint 3:
Use int() before performing arithmetic.
```

Do not immediately reveal the complete solution when the user asks for a hint.

Track hints used in the submission/progress data.

### Progress system

Track:

- attempted problems
- solved problems
- number of attempts
- hints used
- last attempt
- solved date
- topic progress

Dashboard should show:

- total solved
- total attempted
- completion percentage
- topic progress
- recent submissions

### Seed data

Create a seed script containing at least 10 beginner Python problems:

1. Print Hello World
2. Add Two Numbers
3. Calculate Rectangle Area
4. Check Even or Odd
5. Find Largest of Two Numbers
6. Check Positive or Negative
7. Print Numbers 1 to N
8. Sum Numbers 1 to N
9. Count Vowels
10. Reverse a String

Each problem should have:

- description
- examples
- starter code
- at least 3 test cases
- at least 3 progressive hints
- solution
- explanation

### Code execution safety

Treat user-submitted Python as untrusted code.

The implementation must have:

- timeout
- output-size limit
- error handling
- process cleanup

Structure the code-runner service so Docker sandboxing can be added later.

Never allow submitted code to access:

- environment variables
- MongoDB credentials
- application source code
- unrestricted filesystem
- host networking

If secure sandbox execution cannot be implemented in the current environment, clearly isolate the development-only runner and document the limitation instead of pretending it is production safe.

### Error handling

Implement consistent API error responses.

Handle:

- invalid IDs
- missing fields
- authentication errors
- duplicate users
- database errors
- Python syntax errors
- Python runtime errors
- timeouts
- code runner failures
- invalid submissions

### UI requirements

Create a clean modern learning-platform UI.

Prioritize:

- readability
- simple navigation
- beginner-friendly wording
- responsive layout
- clear success/error states
- accessible buttons and forms

Do not add unnecessary animations or complex UI libraries.

### Code quality

Follow these rules:

- Use meaningful variable names.
- Keep components reasonably small.
- Avoid duplicated code.
- Use reusable components.
- Keep API logic separate from UI components.
- Use environment variables for secrets.
- Add comments only where they improve understanding.
- Do not put secrets in Git.
- Create `.env.example`.
- Create a useful README.

### Development approach

Work in these stages, verifying the app after each one:

1. React + Express health check.
2. MongoDB + Mongoose connection.
3. Topics, problems, and seed data.
4. Problem UI + Monaco editor.
5. Python runner + test cases.
6. Progressive hints.
7. Authentication.
8. Progress + dashboard.
9. Responsive polish, validation, accessibility, loading/error/empty states.

Do not begin a later stage until the current one is working and the user asks you to continue.

Do not implement AI features, leaderboards, multiple programming languages, or advanced gamification in the first MVP.

### Important

I am a beginner programmer.

When making architectural or implementation decisions:

- Prefer simple solutions.
- Explain important decisions briefly.
- Avoid unnecessary abstractions.
- Do not introduce technologies that are not required.
- Give me exact commands to run.
- Tell me which files you create or modify.
- If something is potentially dangerous, explain why.
- Keep the project understandable enough for me to study and learn from it.

Start with Stage 1 only. Create the Vite React client and independently runnable Express server. Add `GET /api/health`, connect the React page to it, and display loading, success, and failure states. Use a Vite `/api` proxy for local development. Add a README with exact install/run/verification commands and a `.gitignore` that protects `server/.env`. Verify the endpoint and browser response, then stop and wait for my instruction. Do not implement MongoDB, models, seed data, authentication, topics/problems, Monaco, hints, progress, submissions, or Python execution yet.
