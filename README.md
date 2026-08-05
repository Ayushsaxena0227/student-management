# Student Management System

A full-stack MERN application for managing student records with a clean, minimal, and responsive user interface.

## Tech Stack

- Frontend: React, Vite, Axios, CSS Modules
- Backend: Node.js, Express.js
- Database: MongoDB, Mongoose

## Features

- Dashboard with total student count
- Add new student
- View student details
- Edit student details
- Delete student with confirmation dialog
- Search by name and course
- Full frontend and backend validation
- Responsive UI for desktop and mobile

## Validation Rules

- Name: Required, minimum 2 characters
- Email: Required, valid format, must be unique
- Phone: Required, exactly 10 digits
- Course: Required
- Age: Required, must be between 18 and 30

## MongoDB Schema

The student schema includes the following fields:

- name
- email
- phone
- course
- age

## API Endpoints

- GET /students -> Get all students
- GET /students?search=value -> Search students by name or course
- POST /students -> Create a new student
- PUT /students/:id -> Update student details
- DELETE /students/:id -> Delete a student

## Project Structure

student-management/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── utils/
│   ├── .env.example
│   └── package.json
└── README.md

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/student-management.git
cd student-management

2. Backend setup
Bash

cd backend
npm install
Create a .env file inside the backend folder and add:

env

PORT=5000
MONGO_URI=your_mongodb_connection_string
Start the backend server:

Bash

npm run dev
The backend will run on http://localhost:5000.

3. Frontend setup
Open a new terminal and run:

Bash

cd frontend
npm install
Create a .env file inside the frontend folder and add:

env

VITE_API_URL=http://localhost:5000
Start the frontend server:

Bash

npm run dev
The frontend will run on http://localhost:3000.

Deployment
Frontend can be deployed on Vercel
Backend can be deployed on Render
MongoDB Atlas can be used for cloud database connection

