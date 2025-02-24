import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import HomePage from "./pages/HomePage";
import BookPage from "./pages/BookPage";
import MemberPage from "./pages/MemberPage";
import IssuancePage from "./pages/IssuancePage";
import BookForm from "./components/BookForm";
import MemberForm from "./components/MemberForm";
import IssuanceForm from "./components/IssuanceForm";
import ContactPage from "./pages/ContactPage";
import { Link } from "react-router-dom";
import ReportPage from "./pages/ReportPage";
import "./App.css";

// Navigation Bar Component
const Navbar = ({ toggleDarkMode, isDarkMode }) => {
  return (
    <nav className="navbar">
      <div className="flex items-center">
        <a href="/"><h1 className="text-xl font-bold">📚 Library Management System</h1></a>
      </div>
      <div>
      <Link to="/">🏠 Home</Link>
<Link to="/books">📖 Books</Link>
<Link to="/members">👥 Members</Link>
<Link to="/issuance">🔄 Issuance</Link>

        <button onClick={toggleDarkMode} className="ml-4 btn-primary">
          {isDarkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
    </nav>
  );
};

// App Component
function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="min-h-screen flex flex-col">
        <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto p-6 flex-grow"
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/books" element={<BookPage />} />
            <Route path="/books/add" element={<BookForm />} />
            <Route path="/books/edit/:id" element={<BookForm />} />
            <Route path="/members" element={<MemberPage />} />
            <Route path="/members/add" element={<MemberForm />} />
            <Route path="/members/edit/:id" element={<MemberForm />} />
            <Route path="/issuance" element={<IssuancePage />} />
            <Route path="/issuance/add" element={<IssuanceForm />} />
            <Route path="/issuance/edit/:id" element={<IssuanceForm />} />
            <Route path="/reports" element={<ReportPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </motion.div>

        {/* Footer (Sticky at the Bottom) */}
        <footer className="text-center text-gray-500 p-4 mt-auto">
          <p>📚 Library Management System &copy; {new Date().getFullYear()}</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
