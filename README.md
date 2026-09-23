# Ayets Task Management

A modern full-stack task management application built with **React, Express.js, Node.js, and MongoDB**. It provides a clean and responsive user experience for creating, managing, updating, and tracking daily tasks.

##  Features

* Create new tasks
* View all tasks
* View individual task details
* Edit task name and status
* Mark tasks as complete or incomplete
* Delete tasks
* Responsive and user-friendly interface
* RESTful API integration
* MongoDB database integration

##  Tech Stack

| Technology   | Usage             |
| ------------ | ----------------- |
| React + Vite | Frontend          |
| Node.js      | Backend Runtime   |
| Express.js   | REST API          |
| MongoDB      | Database          |
| Mongoose     | Database Modeling |
| Tailwind CSS | UI Styling        |

##  Project Structure

bash
Ayets-Task-Management/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── .env.example
│   ├── index.js
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
├── README.md
└── .gitignore
```

## API Endpoints

Base URL:

text
http://localhost:4000/api
```

### Get All Tasks

http
GET /all-task


### Get Single Task

http
GET /single-task/:id


### Add New Task

http
POST /add-task


Request body:

json
{
  "name": "Complete project report"
}


### Update Task

http
PUT /update-task/:id


Request body:

json
{
  "name": "Updated task title",
  "isComplete": "yes"
}


### Delete Task

http
DELETE /delete-task/:id


## Environment Setup

Create a `.env` file inside the `backend` directory:

env
PORT=4000
MONGO_URL=mongodb://localhost:27017/todo


##  Installation

### 1. Clone the Repository

bash
git clone <your-repository-url>
cd Ayets-Task-Management


### 2. Install Backend Dependencies

bash
cd backend
npm install


### 3. Install Frontend Dependencies

Open another terminal:

bash
cd frontend
npm install


## Run the Application

### Start Backend

bash
cd backend
npm run dev


Backend will run at:

text
http://localhost:4000


### Start Frontend

bash
cd frontend
npm run dev


Frontend will typically run at:

text
http://localhost:5173


## Database

This project uses **MongoDB with Mongoose** for storing and managing task data.

Make sure MongoDB is running locally before starting the backend server.

The task model uses:

text
isComplete: "yes" | "no"


to represent the completion status of each task.

##  Project Purpose

This project was developed to practice and demonstrate practical **full-stack web development concepts**, including:

* React component development
* RESTful API design
* CRUD operations
* Express.js routing
* MongoDB database integration
* Mongoose data modeling
* Frontend-backend communication
* Responsive UI development

##  Future Improvements

* User authentication and authorization
* Task filtering and search
* Task categories and priorities
* Due dates and reminders
* User-specific task management
* Deployment with a production database

## License

This project is created for **educational and learning purposes**.
