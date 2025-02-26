# 📚 Library Management System 🚀

Welcome to the **Library Management System**—a powerful, efficient, and user-friendly platform designed to streamline book management and tracking in libraries. 📚✨

## 🌟 About This Project
This system ensures smooth handling of **book issuance, member management, and insightful reporting** with a full-stack modern tech approach.

### 🛠 Tech Stack
- **Frontend:** Vite ⚡ + React 🤍 (Latest Version)
- **Backend:** NodeJS 🎉 + Express 🚀 + Prisma 🛢️ + PostgreSQL 🐗
- **Authentication & Security:** Middleware Magic ✨
- **Deployment:** Docker 🐳 + CI/CD Ready 🎯
- **Monitoring & Logging:** Winston 📜 + Google Cloud Logging 🌍

## 🎯 Features
✅ Add, edit, delete members with details 👇  
✅ Categorize books with collections & categories 📚  
✅ Issue books to members with return tracking ⏳  
✅ Generate reports on **never borrowed & overdue books** 📊  
✅ Logging system with **Winston & Google Cloud Logging** 📝  
✅ Containerized with **Docker & Google Cloud Run** 🚀  
✅ Intuitive and sleek UI for a seamless experience 🎨  

## 🌍 Deployed Links
- **Frontend:** [Library Frontend](https://frontend-service-887498617048.us-central1.run.app)
- **Backend:** [Library Backend](https://backend-service-887498617048.us-central1.run.app)

## 🏡 Homepage
![Homepage](https://snipboard.io/3OnZ82.jpg)

## 📚 Books Section
### Book Listing
![Book Page](https://snipboard.io/dawCYp.jpg)
### Add New Book
![Add New Book](https://snipboard.io/SrqayE.jpg)
### Edit Book
![Edit Book](https://snipboard.io/rR4t2s.jpg)

## 👥 Members Section
### Member Listing
![Member Page](https://snipboard.io/7Dp3gw.jpg)
### Add New Member
![Add New Member](https://snipboard.io/ue9X8b.jpg)
### Edit Member
![Edit Member](https://snipboard.io/pgIWeq.jpg)

## ♻️ Issuance Section
### Issuance Listing
![Issuance Page](https://snipboard.io/57MNXI.jpg)
### Add New Issuance
![Add New Issuance](https://snipboard.io/X1AeN0.jpg)
### Edit Issuance
![Edit Issuance](https://snipboard.io/z78VSh.jpg)

## 📊 Library Reports
![Library Report 1](https://snipboard.io/F136Zt.jpg)  
![Library Report 2](https://snipboard.io/Z6hCY8.jpg)  
![Library Report 3](https://snipboard.io/o2cY3a.jpg)  

## 📞 Contact Page
![Contact Page](https://snipboard.io/MAalJ0.jpg)

## 🏢 Project Structure
```
library-management-system/
├── backend/               # Backend API (Node.js + Express + Prisma)
│   ├── routes/            # API routes for members, books, issuance, reports
│   ├── prisma/            # Database schema and migrations
│   ├── services/          # Query services & business logic
│   ├── middleware/        # Authentication & security
│   ├── logging/           # Winston & Google Cloud Logging
│   ├── tests/             # Automated backend tests
│   ├── docs/              # API Documentation
│   ├── Dockerfile         # Backend containerization
│   ├── .env               # Environment variables (DB, API Keys)
│   ├── index.js           # Main Express server
│   └── package.json       # Dependencies & scripts
│
├── frontend/              # Vite + React Frontend
│   ├── src/               # React source code
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Home, Books, Members, Issuance, Reports, Contact
│   │   ├── App.jsx        # Main App Component
│   │   ├── main.jsx       # React entry point
│   ├── public/            # Static assets
│   ├── Dockerfile         # Frontend containerization
│   ├── vite.config.js     # Vite configuration
│   ├── .env               # Frontend environment variables
│   └── package.json       # Dependencies & scripts
│
├── docker-compose.yml      # Docker setup for full project
├── .github/workflows/      # CI/CD pipeline
├── README.md               # The file you’re reading now!
```

## 🚀 Quick Start
### 🏢 Backend Setup
```sh
cd backend
npm install
npx prisma migrate dev --name init
npm run dev
```

### 🎨 Frontend Setup
```sh
cd frontend
npm install
npm run dev
```

### 🐳 Running with Docker
```sh
docker-compose up --build
```

## 🎯 API Endpoints
📌 **GET** `/books` - Fetch all books  
📌 **POST** `/books/add` - Add a new book  
📌 **GET** `/reports/never-borrowed` - Get books never borrowed  
📌 **GET** `/reports/outstanding-books` - Books that are overdue  
📌 **GET** `/reports/top-borrowed-books` - Most borrowed books ranking 📈  

## 🏆 Round 2 Task Implementation
- ✅ **Logging System:** Implemented **Winston logging** with **Google Cloud Logging**
- ✅ **Containerization:** Created **Dockerized** backend & frontend services
- ✅ **Deployment:** Successfully deployed to **Google Cloud Run**
- ✅ **Configuration Management:** Ensured **environment variables** are properly set for both frontend & backend
- ✅ **Persistent Database:** Used **Google Cloud PostgreSQL (NeonDB)** for persistent storage

## 🤝 Contributing
Got an idea? A feature request? **PRs are welcome!** Fork the repo and make it even better! 💡✨

## 📞 Contact
📧 **Email:** harish.s@kalvium.community

🔗 **LinkedIn:** [Harish Karthick S](https://www.linkedin.com/in/harish-karthick-s-45bb27276/) 

🐙 **GitHub:** [Harish Karthick S](https://github.com/HarishKarthickS)  

## 🎾 Final Words
Thanks for checking out this project! If you made it this far, you deserve a **virtual high-five** ✋!  
Happy coding & keep reading! 📚✨

