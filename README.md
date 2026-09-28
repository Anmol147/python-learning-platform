# Python Learning Platform

A beginner-friendly Python practice platform. Stage 1 connects a React frontend to an Express API. MongoDB, topics, problems, hints, code execution, authentication, and progress will be added in later stages.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Install

From the project root:

```powershell
npm.cmd --prefix client install
npm.cmd --prefix server install
```

## Run

Open two PowerShell terminals in the project root.

Terminal 1, start the API:

```powershell
npm.cmd run server
```

Terminal 2, start React:

```powershell
npm.cmd run client
```

Open the frontend URL printed by Vite, normally `http://localhost:5173`. The API endpoint is `http://localhost:5000/api/health` and returns:

```json
{ "success": true, "message": "API is running" }
```

The React page calls the endpoint through Vite's `/api` proxy. Stop the API to see the connection error and retry control.

## Build check

```powershell
npm.cmd run build
```

Python code execution is not included. A future local subprocess runner must be development-only; public code execution requires an isolated sandbox.