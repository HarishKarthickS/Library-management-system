# 📚 Library Management System 🚀

Welcome to the **Library Management System**—a powerful, efficient, and user-friendly platform designed to streamline book management and tracking in libraries. 📖✨

## 🌟 About This Project
This system ensures smooth handling of **book issuance, member management, and insightful reporting** with a full-stack modern tech approach.

### 🛠 Tech Stack
- **Frontend:** Vite ⚡ + React 🧡 (Latest Version, No Routes)
- **Backend:** Express 🚀 + Prisma 🛢️ + PostgreSQL 🐘
- **Authentication & Security:** Middleware Magic ✨
- **Deployment:** Docker 🐳 + CI/CD Ready 🎯

## 🎯 Features
✅ Add, edit, delete members with details 📇  
✅ Categorize books with collections & categories 📖  
✅ Issue books to members with return tracking ⏳  
✅ Generate reports on **never borrowed & overdue books** 📊  
✅ Intuitive and sleek UI for a seamless experience 🎨  

## 🏗️ Project Structure
```
library-management-system/
├── backend/               # Backend API (Node.js + Express + Prisma)
│   ├── routes/            # API routes for members, books, issuance, reports
│   ├── prisma/            # Database schema and migrations
│   ├── services/          # Query services & business logic
│   ├── middleware/        # Authentication & security
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
### 🏗 Backend Setup
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

## 🏆 Why This Project is Awesome
- **🚀 High Performance:** Optimized with Prisma & Vite ⚡
- **📊 Insightful Reports:** Know which books are most/least borrowed 📉
- **🎨 Sleek UI:** Easy navigation with an elegant design ✨
- **🛠 Scalable & Maintainable:** Modular and future-proof architecture 🏗

## 🏅 The Task & Job Relevance
This project aligns perfectly with UI/UX, AI Engineering, and Data Engineering roles:
- **📐 UI/UX:** Designing an intuitive and responsive dashboard.
- **📊 Data Engineering:** Managing book & member data effectively.
- **🤖 AI Engineering:** Can be extended with AI-powered book recommendations.

## 🤝 Contributing
Got an idea? A feature request? **PRs are welcome!** Fork the repo and make it even better! 💡✨

## 📞 Contact
📧 **Email:** harish.s@kalvium.community

🔗 **LinkedIn:** [Harish Karthick S](https://www.linkedin.com/in/harish-karthick-s-45bb27276/) 

🐙 **GitHub:** [Harish Karthick S](https://github.com/HarishKarthickS)  

## 🏁 Final Words
Thanks for checking out this project! If you made it this far, you deserve a **virtual high-five** ✋! 
Happy coding & keep reading! 📖✨

