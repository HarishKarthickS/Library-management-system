import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Function to show a welcome toast notification
const showWelcomeToast = () => {
  toast.success("Welcome to the Library Management System! 📚", {
    position: "top-right",
    autoClose: 3000,
  });
};

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-6"
    >
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white p-10 rounded-lg shadow-lg text-center"
      >
        <h1 className="text-4xl font-extrabold">📚 Welcome to the Library Management System</h1>
        <p className="mt-3 text-lg">Manage books, members, and issuances efficiently!</p>
        <button 
          onClick={showWelcomeToast} 
          className="mt-4 px-4 py-2 bg-white text-blue-600 font-bold rounded-md shadow-md hover:bg-gray-200 transition"
        >
          🎉 Everything Starts Here
        </button>
      </motion.div>

      {/* Navigation Cards */}
      <div className="mt-[6vh] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { path: "/books", label: "📖 Manage Books", color: "bg-indigo-500 hover:bg-indigo-600" },
          { path: "/members", label: "👥 Manage Members", color: "bg-green-500 hover:bg-green-600" },
          { path: "/issuance", label: "🔄 Manage Issuances", color: "bg-orange-500 hover:bg-orange-600" },
          { path: "/reports", label: "📊 View Reports", color: "bg-purple-500 hover:bg-purple-600" },
        ].map((nav, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <Link
              to={nav.path}
              className={`${nav.color} text-white p-6 rounded-lg shadow-md text-center block transition transform hover:scale-105`}
            >
              {nav.label}
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-[6vh] p-6 bg-white rounded-lg shadow-md w-full max-w-[100vw] text-center"
      >
        <h2 className="text-2xl font-bold">Stay Connected</h2>
        <p className="mt-3 text-gray-700">
          Explore more features and stay updated with our latest news.
        </p>
        <Link to="/contact" className="mt-4 inline-block text-blue-600 hover:underline">
          Contact Us
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default HomePage;
