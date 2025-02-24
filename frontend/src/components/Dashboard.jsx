import { React,useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";



const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalMembers: 0,
    issuedBooks: 0,
  });

  const [recentIssuances, setRecentIssuances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [booksRes, membersRes, issuanceRes, recentIssuancesRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/book`, {
          headers: { "x-api-key": import.meta.env.VITE_API_KEY },
        }),
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/member`, {
          headers: { "x-api-key": import.meta.env.VITE_API_KEY },
        }),
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/issuance`, {
          headers: { "x-api-key": import.meta.env.VITE_API_KEY },
        }),
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/reports/recent-issuances`, {
          headers: { "x-api-key": import.meta.env.VITE_API_KEY },
        }),
      ]);

      setStats({
        totalBooks: booksRes.data.length,
        totalMembers: membersRes.data.length,
        issuedBooks: issuanceRes.data.filter((i) => i.issuance_status === "pending").length,
      });

      setRecentIssuances(recentIssuancesRes.data.slice(0, 5)); // Show latest 5 issuances
      toast.success("Dashboard data loaded successfully!", { position: "top-right" });
    } catch (error) {
      toast.error("Error fetching dashboard data!", { position: "top-right" });
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-6"
    >
      <h1 className="text-3xl font-bold text-center text-white mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4 rounded-lg shadow-md">
        📊 Library Dashboard
      </h1>

      {loading ? (
        <p className="text-center text-gray-300">Loading data...</p>
      ) : (
        <div>
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Total Books", value: stats.totalBooks, color: "from-blue-500 to-teal-400" },
              { label: "Total Members", value: stats.totalMembers, color: "from-green-500 to-yellow-400" },
              { label: "Issued Books", value: stats.issuedBooks, color: "from-red-500 to-orange-400" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`bg-gradient-to-r ${stat.color} text-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:scale-105`}
              >
                <h2 className="text-lg font-semibold">{stat.label}</h2>
                <p className="text-4xl font-bold">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Recent Issuances */}
          <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">📚 Recent Issuances</h2>
            {recentIssuances.length === 0 ? (
              <p className="text-gray-500">No recent issuances.</p>
            ) : (
              <ul className="divide-y divide-gray-300">
                {recentIssuances.map((issuance, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="py-3 flex justify-between hover:bg-gray-100 p-2 rounded-lg transition"
                  >
                    <span className="font-medium">{issuance.book_name}</span>
                    <span className="text-gray-600">Issued to: {issuance.member_name}</span>
                    <span className="text-red-500">Due: {issuance.target_return_date}</span>
                  </motion.li>
                ))}
              </ul>
            )}
          </div>

          {/* Navigation (Using React Router `Link`) */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { path: "/books", label: "📖 Manage Books", color: "bg-indigo-500 hover:bg-indigo-600" },
              { path: "/members", label: "👥 Manage Members", color: "bg-purple-500 hover:bg-purple-600" },
              { path: "/issuance", label: "🔄 Manage Issuance", color: "bg-orange-500 hover:bg-orange-600" },
            ].map((nav, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Link
                  to={nav.path}
                  className={`${nav.color} text-white p-4 rounded-lg shadow-md text-center block transition transform hover:scale-105`}
                >
                  {nav.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Dashboard;
