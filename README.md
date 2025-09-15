# React To-Do List App

A modern, drag-and-drop enabled To-Do List built with React. This app supports CRUD operations, task filtering, and syncing with a backend API.\
The backend for this project can be found here: https://github.com/liam-fitzsimons/todo-backend

---

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Demo

Demo: https://todo-frontend-theta-bice.vercel.app/

---

## Features

- Add new tasks
- Edit existing tasks inline
- Delete tasks
- Mark tasks as completed
- Filter tasks by All / Active / Completed
- Reorder tasks via drag and drop
- Sync tasks with a backend API

---

## Tech Stack

- React 18+
- [@hello-pangea/dnd](https://github.com/hello-pangea/dnd) for drag-and-drop
- Fetch API for backend communication
- CSS-in-JS for inline styling

---

## Prerequisites

- Node.js (v14+ recommended)
- npm or yarn
- Running backend API with endpoints for task management (see API Endpoints section)

---

## Getting Started

1. Clone the repo:

   ```bash
   git clone https://github.com/your_username/your_repo_name.git
   cd your_repo_name
   ```
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a .env file in the root directory and add your backend API URL:

   ```bash
   REACT_APP_API_URL=http://localhost:5000
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Open http://localhost:3000 in your browser to view the app.

   
## Environment Variables
| Variable            | Description                 | Example                 |
| ------------------- | --------------------------- | ----------------------- |
| `REACT_APP_API_URL` | Base URL of the backend API | `http://localhost:5000` |

## Usage
- Add Task: Type a task in the input box and press Enter or click Add.
- Edit Task: Double-click a task to edit it inline. Press Enter to save or Escape to cancel.
- Delete Task: Click the red Delete button to remove a task.
- Complete Task: Toggle the checkbox to mark a task as completed.
- Filter: Use the buttons to filter tasks by All, Active, or Completed.
- Reorder: Drag and drop tasks to reorder them.

## API Endpoints (Backend)
This frontend expects a backend API with the following RESTful endpoints:
| Method | Endpoint         | Description       | Request Body       | Response            |
| ------ | ---------------- | ----------------- | ------------------ | ------------------- |
| GET    | `/api/tasks`     | Get all tasks     | None               | Array of tasks      |
| POST   | `/api/tasks`     | Create a new task | `{ text: string }` | Created task object |
| PUT    | `/api/tasks/:id` | Update a task     | `{ text: string }` | Updated task object |
| DELETE | `/api/tasks/:id` | Delete a task     | None               | Status message      |

## Task Object Schema
{
  "_id": "string",
  "text": "string",
  "completed": "boolean"
}

## Folder Structure
your_repo_name/
├── public/
├── src/
│   ├── App.jsx         # Main React component
│   ├── index.js        # React entry point
│   └── ...             # Other components/styles if any
├── .env                # Environment variables
├── package.json
├── README.md
└── ...

## Licence
This project is licensed under the MIT License.
