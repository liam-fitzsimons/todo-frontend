# React To-Do List App

A modern, drag-and-drop enabled To-Do List built with React. This app supports CRUD operations, task filtering, and syncing with a backend API.

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

5. Start the development server:
Open http://localhost:3000 in your browser to view the app.
