# 📌 Library Management System - Setup Guide

## 🚀 Overview
This guide will walk you through setting up the **Library Management System** for both **backend** and **frontend**. By the end, you'll have a fully functional application running locally or in a Docker container.

---

## 📌 Prerequisites
Ensure you have the following installed before proceeding:

✅ **Node.js** (Version 18 or higher) → [Download Here](https://nodejs.org/)  
✅ **PostgreSQL** (Version 13 or higher) → [Download Here](https://www.postgresql.org/download/)  
✅ **Docker** (Optional, for containerized deployment) → [Download Here](https://www.docker.com/get-started/)  
✅ **Git** (For version control) → [Download Here](https://git-scm.com/downloads)  
✅ **Vite (Frontend Tool)** (Installed via npm)  

---

# 📌 Backend Setup

## 📌 1️⃣ Clone the Repository
```bash
git clone https://github.com/HarishKarthickS/Library-management-system.git
cd Library-management-system/backend
```

---

## 📌 2️⃣ Install Dependencies
Run the following command to install all required packages:
```bash
npm install
```

---

## 📌 3️⃣ Configure Environment Variables
Create a **`.env`** file in the backend directory and add the following:
```env
PORT=3000
DATABASE_URL=postgresql://postgres:password@localhost:5432/library_db
API_KEY=your_secure_api_key
```

🔹 **Change `DATABASE_URL`** to match your PostgreSQL credentials.  
🔹 **Change `API_KEY`** to a secure random string.

---

## 📌 4️⃣ Set Up PostgreSQL Database
```bash
psql -U postgres
CREATE DATABASE library_db;
```

---

## 📌 5️⃣ Run Database Migrations
```bash
npx prisma migrate dev --name init
```

---

## 📌 6️⃣ Start the Backend Server
```bash
npm run dev
```
The API should now be running at:
```
http://localhost:3000
```

---

## 📌 7️⃣ Running Tests
Run API tests using **Jest** and **Supertest**:
```bash
npm test
```

---

## 📌 8️⃣ Deploying Backend with Docker (Optional)
```bash
docker build -t library-backend .
docker run -p 3000:3000 --env-file .env library-backend
```

---

# 📌 Frontend Setup

## 📌 1️⃣ Navigate to the Frontend Directory
```bash
cd ../frontend
```

---

## 📌 2️⃣ Install Dependencies
Run the following command:
```bash
npm install
```

---

## 📌 3️⃣ Configure Environment Variables
Create a **`.env`** file in the frontend directory:
```env
VITE_API_BASE_URL=http://localhost:3000
```

---

## 📌 4️⃣ Start the Frontend Development Server
```bash
npm run dev
```
The frontend should now be running at:
```
http://localhost:5173
```

---

## 📌 5️⃣ Building for Production
```bash
npm run build
```
This will generate optimized production files inside the `dist/` folder.

---

## 📌 6️⃣ Running Frontend in Docker (Optional)
```bash
docker build -t library-frontend .
docker run -p 5173:5173 --env-file .env library-frontend
```

---

## 📌 Troubleshooting
### **Backend Database Connection Error?**
✔ Ensure PostgreSQL is running.  
✔ Check `DATABASE_URL` in `.env`.  
✔ Restart your database server.

### **Frontend Not Connecting to Backend?**
✔ Ensure `VITE_API_BASE_URL` is correctly set.  
✔ Make sure the backend is running.  
✔ Check browser console for errors.

---

## 📌 Contribution Guide
1️⃣ Fork the repository.  
2️⃣ Create a new branch (`feature/your-feature`).  
3️⃣ Commit and push your changes.  
4️⃣ Submit a pull request.

---

## 📌 License
This project is licensed under the **MIT License**.

---

### 🎉 Your Library Management System is now fully set up and ready to use! 🚀

