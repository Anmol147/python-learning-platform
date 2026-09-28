# Python Learning Platform

A beginner-friendly learning platform for practicing Python. **Stage 1** connects a React frontend to an Express API. MongoDB, lessons, problems, the editor, hints, accounts, progress, and Python execution are later stages and are not implemented yet.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Install dependencies

Run these commands from the project root in PowerShell:

```powershell
npm.cmd --prefix client install
npm.cmd --prefix server install
```

## Start the applications

Open two PowerShell terminals in the project root.

Terminal 1, start Express:

```powershell
npm.cmd --prefix server run dev
```

Terminal 2, start React:

```powershell
npm.cmd --prefix client run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173`. The React page requests `/api/health`; Vite forwards that request to Express at port 5000.

## Verify the connection

Open `http://localhost:5000/api/health`. The API should respond with:

```json
{ "success": true, "message": "API is running" }
```

The React page should display `API is running`. Stop the Express terminal and reload the page to see its connection error and retry button.

## Build check

```powershell
npm.cmd run build
```

Python execution is not part of Stage 1. Any future local subprocess runner must be labeled development-only; public submissions require an isolated sandbox.