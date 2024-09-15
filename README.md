Task Management App
Overview

This is a Task Management application built using a combination of React, Node.js, and MongoDB. The app allows users to register, log in, and manage their tasks. Tasks can be added, updated, completed, and deleted. The app also supports reordering tasks and filtering between completed and pending tasks.
Technologies Used

    Frontend: React, Axios
    Backend: Node.js, Express
    Database: MongoDB, Mongoose
    Authentication: Bcrypt for password hashing

Features

    User Registration: Allows new users to create an account.
    User Login: Enables users to log in to their accounts.
    Task Management:
        Add Task: Users can create new tasks with a title and description.
        Update Task: Users can mark tasks as completed or update their order.
        Delete Task: Users can delete tasks.
        Reorder Tasks: Users can move tasks up or down in the list.
        Filter Tasks: Users can view all tasks or filter to see only completed tasks.

Installation and Setup
Prerequisites

    Node.js and npm installed
    MongoDB instance running
    dotenv package for environment variables

Backend Setup

    Clone the repository:

    bash

git clone <repository-url>
cd <repository-directory>

Navigate to the backend directory and install dependencies:

bash

cd backend
npm install

Create a .env file in the backend directory with the following content:

env

MONGO_URI=<your-mongodb-connection-string>
PORT=5000

Start the backend server:

bash

    npm start

Frontend Setup

    Navigate to the frontend directory:

    bash

cd frontend

Install dependencies:

bash

npm install

Start the React application:

bash

    npm start

Usage
Register

    Navigate to /register to create a new account by providing a name, email, and password.

Login

    Navigate to /login to access your account by providing your email and password.

Dashboard

    After logging in, you will be redirected to the dashboard where you can:
        Add new tasks.
        View, update, and delete tasks.
        Reorder tasks using the up and down arrows.
        Filter tasks to view completed or pending tasks.

Protected Routes

    The / route (Dashboard) is protected and requires authentication. If you are not logged in, you will be redirected to the login page.

API Endpoints
Authentication

    POST /register: Registers a new user.
    POST /login: Logs in a user.

Task Management

    POST /addtodo: Adds a new task.
    GET /gettodo: Retrieves tasks for a specific user.
    DELETE /deletetodo/:todo_id: Deletes a task.
    PUT /completetodo/:todo_id: Marks a task as completed.
    PUT /updateorder: Updates the order of tasks.

Contributing

