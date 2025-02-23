import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

const ReportPage = () => {
  const [reports, setReports] = useState({
    neverBorrowedBooks: [],
    outstandingBooks: [],
    topBorrowedBooks: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const [neverBorrowedRes, outstandingRes, topBorrowedRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/reports/never-borrowed`, {
          headers: { "x-api-key": import.meta.env.VITE_API_KEY },
        }),
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/reports/outstanding-books`, {
          headers: { "x-api-key": import.meta.env.VITE_API_KEY },
        }),
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/reports/top-borrowed-books`, {
          headers: { "x-api-key": import.meta.env.VITE_API_KEY },
        }),
      ]);

      setReports({
        neverBorrowedBooks: neverBorrowedRes.data,
        outstandingBooks: outstandingRes.data,
        topBorrowedBooks: topBorrowedRes.data,
      });

      toast.success("📊 Reports loaded successfully!", { position: "top-right" });
    } catch (error) {
      toast.error("❌ Error loading reports!", { position: "top-right" });
    }
    setLoading(false);
  };

  // Helper function to render a scrollable table.
  const ScrollableTable = ({ children }) => (
    <div className="max-h-96 overflow-y-auto border border-gray-300 rounded-lg shadow-lg">
      <table className="w-full border-collapse">
        {children}
      </table>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-6"
    >
      <h1 className="text-3xl font-bold text-center text-white mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4 rounded-lg shadow-md">
        📊 Library Reports
      </h1>

      {loading ? (
        <p className="text-center text-gray-300">Loading reports...</p>
      ) : (
        <div className="space-y-8">
          {/* Never Borrowed Books */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">📚 Books Never Borrowed</h2>
            {reports.neverBorrowedBooks.length === 0 ? (
              <p className="text-gray-500">All books have been borrowed.</p>
            ) : (
              <ScrollableTable>
                <thead className="bg-gray-700 text-white shadow-md">
                  <tr>
                    <th className="p-3">Book Name</th>
                    <th className="p-3">Publisher</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.neverBorrowedBooks.map((book, index) => (
                    <tr key={index} className="border-b hover:bg-gray-100 transition text-center">
                      <td className="p-3">{book.book_name}</td>
                      <td className="p-3">{book.book_publisher}</td>
                    </tr>
                  ))}
                </tbody>
              </ScrollableTable>
            )}
          </div>

          {/* Outstanding Books */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              ⏳ Outstanding Books (Not Returned)
            </h2>
            {reports.outstandingBooks.length === 0 ? (
              <p className="text-gray-500">No outstanding books.</p>
            ) : (
              <ScrollableTable>
                <thead className="bg-red-500 text-white shadow-md">
                  <tr>
                    <th className="p-3">📖 Book</th>
                    <th className="p-3">👤 Member</th>
                    <th className="p-3">📅 Issued Date</th>
                    <th className="p-3">⏰ Return Due Date</th>
                    <th className="p-3">🏢 Publisher</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.outstandingBooks.map((record, index) => (
                    <tr key={index} className="border-b hover:bg-gray-100 transition text-center">
                      <td className="p-3">{record.book}</td>
                      <td className="p-3">{record.member}</td>
                      <td className="p-3">
                        {new Date(record.issuance_date).toLocaleDateString()}
                      </td>
                      <td className="p-3">
                        {new Date(record.target_return_date).toLocaleDateString()}
                      </td>
                      <td className="p-3">{record.publisher}</td>
                    </tr>
                  ))}
                </tbody>
              </ScrollableTable>
            )}
          </div>

          {/* Top Borrowed Books */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              🔥 Top 10 Most Borrowed Books
            </h2>
            {reports.topBorrowedBooks.length === 0 ? (
              <p className="text-gray-500">No data available.</p>
            ) : (
              <ScrollableTable>
                <thead className="bg-blue-500 text-white shadow-md">
                  <tr>
                    <th className="p-3">📖 Book Name</th>
                    <th className="p-3">⏱️ Times Borrowed</th>
                    <th className="p-3">👥 Members Borrowed</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.topBorrowedBooks.map((book, index) => (
                    <tr key={index} className="border-b hover:bg-gray-100 transition text-center">
                      <td className="p-3">{book.book_name}</td>
                      <td className="p-3">{book.times_borrowed}</td>
                      <td className="p-3">{book.members_borrowed}</td>
                    </tr>
                  ))}
                </tbody>
              </ScrollableTable>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ReportPage;
