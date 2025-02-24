# 📌 Library Management System - System Architecture

## 🚀 Overview
The **Library Management System** is a **full-stack web application** that enables seamless management of books, members, and book issuance records. It follows a **modular and scalable architecture** using modern web technologies.

---

## 📌 Architecture Diagram
```
+----------------------+     +----------------------+     +----------------------+
|      Frontend       | --> |      Backend        | --> |      Database       |
| (Vite + React.js)  |     | (Node.js + Express) |     |  (PostgreSQL + Prisma) |
+----------------------+     +----------------------+     +----------------------+
```

---

## 📌 Technology Stack
### **Frontend (Client)**
- **React.js** (Vite) → Fast UI rendering
- **Tailwind CSS** → Modern styling
- **Axios** → API requests

### **Backend (API Server)**
- **Node.js + Express.js** → Handles API requests
- **Prisma ORM** → Database interaction
- **JWT & API Keys** → Authentication & security

### **Database**
- **PostgreSQL** → Relational database for storing records
- **Prisma ORM** → Provides query abstraction and migrations

### **DevOps & Deployment**
- **Docker** → Containerization
- **GitHub Actions** → CI/CD pipeline
- **AWS / DigitalOcean (Optional)** → Cloud deployment

---

## 📌 Component Breakdown
### **1️⃣ Frontend (React + Vite)**
- `/components/` → Reusable UI components
- `/pages/` → Different views (Dashboard, Books, Members, Issuance)
- `/services/api.js` → Axios API service
- `/hooks/` → Custom React hooks
- `.env` → Stores `VITE_API_BASE_URL`

### **2️⃣ Backend (Node.js + Express)**
- `/routes/` → API endpoints for Books, Members, Issuance
- `/middleware/` → Authentication and validation
- `/services/` → Business logic & custom SQL queries
- `/prisma/schema.prisma` → Database schema
- `.env` → Stores `DATABASE_URL` and `API_KEY`

### **3️⃣ Database (PostgreSQL)**
- **`member`** → Stores user details
- **`book`** → Stores book information
- **`issuance`** → Tracks book lending & returns

---

## 📌 API Flow
1. **User requests data** (Frontend → Backend via API)
2. **Backend processes request** (Validates API key, fetches from database)
3. **Prisma ORM interacts with PostgreSQL** (Queries and updates data)
4. **Response is sent back** (JSON format → Frontend renders UI)

---

## 📌 Security & Authentication
✅ **API Key Authentication** → Required for API access
✅ **Role-based Access Control (Optional)** → Restrict admin/user actions
✅ **Environment Variables** → Secure credentials in `.env` file

---

## 📌 Deployment Architecture
1️⃣ **Local Development** → `npm run dev` (Frontend & Backend separately)
2️⃣ **Dockerized Deployment** → `docker-compose up`
3️⃣ **CI/CD Pipeline** → GitHub Actions for automated testing & deployment

---

## 📌 Future Enhancements
🚀 **GraphQL API** → More flexible queries  
🚀 **Admin Dashboard** → Manage members & books via UI  
🚀 **Cloud Hosting** → AWS / DigitalOcean deployment  

---

### 🎯 This **modular & scalable system** ensures easy maintenance and future upgrades! 🚀

