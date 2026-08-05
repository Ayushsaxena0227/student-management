# Student Management System

A full-stack MERN application for managing student records.

## Tech Stack

- **Frontend:** React + Vite, Axios, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)

## Setup Instructions

### Prerequisites

- Node.js >= 18
- MongoDB running locally or MongoDB Atlas URI

---

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd student-management
```

2. Backend Setup
Bash

cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm run dev
3. Frontend Setup
Bash

cd frontend
npm install
cp .env.example .env
npm run dev
API Endpoints
Method	Endpoint	Description
GET	/students	Get all students
POST	/students	Create student
PUT	/students/:id	Update student
DELETE	/students/:id	Delete student
Features
Dashboard with total student count
Add / Edit / Delete students
Search by Name and Course
Full input validation
Responsive UI
Confirmation dialog on delete

