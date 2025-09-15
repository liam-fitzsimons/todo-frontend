# This is the front end for my to-do list app

This is the React frontend for my To-Do List application. It provides the user interface and interacts with the backend API to manage tasks.\
Use this link for a demo: https://todo-frontend-theta-bice.vercel.app/

## Features

- Add, edit, delete, and complete tasks
- Drag-and-drop task reordering
- Filter tasks by All, Active, Completed
- Responsive UI

## Prerequisites
- Node.js and npm installed
- Backend API deployed and accessible

## Setup and Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/your-frontend-repo.git
   cd your-frontend-repo
   
2. Create a .env file in the project root and add your backend API URL:
bash
REACT_APP_API_URL=http://localhost:5000/api/tasks


4. Install the project dependencies:

npm install


Run the development server:

npm start
Open your browser and go to:

http://localhost:3000

## Deployment
- Update the REACT_APP_API_URL environment variable in your deployment environment to point to your live backend API.
- Recommended deployment platforms: Vercel, Netlify, or similar static hosting services.
- Connect your GitHub repo for automatic builds on push.

## Environment Variables
- REACT_APP_API_URL: URL of the backend API to fetch and modify tasks

## Technologies
- React
- @hello-pangea/dnd for drag and drop
- Fetch API for HTTP requests
