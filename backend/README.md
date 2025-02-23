# 📌 Library Management System - Backend

## 🚀 Overview
This is the **backend API** for the Library Management System, built using **Node.js**, **Express.js**, **Prisma ORM**, and **PostgreSQL**. It provides endpoints for managing **members, books, issuances, and reports**, with authentication via API keys.

---

## 📌 Tech Stack
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **Prisma** - ORM for PostgreSQL
- **PostgreSQL** - Relational database
- **Jest & Supertest** - API testing
- **Docker** (Optional) - Containerization

---

## 📌 Features
✅ Member management (Create, Read, Update)  
✅ Book management (Create, Read)  
✅ Issuance records (Book lending system)  
✅ Reports (Never borrowed books, Outstanding books, Most borrowed books)  
✅ API Key authentication  
✅ Prisma ORM for database interactions  
✅ Jest & Supertest for automated API testing  
✅ Error handling & logging  

---

## 📌 Installation

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/your-repo/library-management-backend.git
cd library-management-backend
```

### **2️⃣ Install Dependencies**
```bash
npm install
```

### **3️⃣ Set Up Environment Variables**
Create a **`.env`** file in the project root and add:
```env
PORT=3000
DATABASE_URL=postgresql://postgres:password@localhost:5432/library_db
API_KEY=your_secure_api_key
```

### **4️⃣ Run Database Migrations**
```bash
npx prisma migrate dev --name init
```

### **5️⃣ Start the Server**
#### **Development Mode**
```bash
npm run dev
```
#### **Production Mode**
```bash
npm start
```

---

## 📌 API Endpoints

### **🔹 Authentication**
All requests must include the API Key in headers:
```json
{
  "x-api-key": "your_secure_api_key"
}
```

### **🔹 Member Routes (`/member`)**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/member` | Get all members |
| GET | `/member/:id` | Get member by ID |
| POST | `/member` | Create a new member |
| PUT | `/member/:id` | Update member details |

### **🔹 Book Routes (`/book`)**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/book` | Get all books |
| POST | `/book` | Add a new book |

### **🔹 Issuance Routes (`/issuance`)**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/issuance` | Get all issuance records |
| POST | `/issuance` | Issue a book |

### **🔹 Reports (`/reports`)**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/reports/never-borrowed` | Get books never borrowed |
| GET | `/reports/outstanding-books` | Get outstanding books |
| GET | `/reports/top-borrowed-books` | Get top 10 most borrowed books |

---

## 📌 Running Tests

### **Run API Tests with Jest**
```bash
npm test
```

---

## 📌 Deployment (Docker)

### **1️⃣ Build Docker Image**
```bash
docker build -t library-backend .
```

### **2️⃣ Run Container**
```bash
docker run -p 3000:3000 --env-file .env library-backend
```

---

## 📌 Contribution Guide
1. Fork the repository
2. Create a new branch (`feature/your-feature`)
3. Commit your changes
4. Push to your branch
5. Submit a Pull Request

---

## 📌 License
This project is licensed under the MIT License.

---

### 🚀 Now you can manage your library efficiently with this powerful backend API! Happy Coding! 😃

