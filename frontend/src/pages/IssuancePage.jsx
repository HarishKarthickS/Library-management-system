import { React,useEffect, useState,useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Modal from "react-modal";
import "react-toastify/dist/ReactToastify.css";



// Custom styles for modal
const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  content: {
    width: "400px",
    margin: "auto",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    backgroundColor: "#fff",
  },
};

const IssuancePage = () => {
  const navigate = useNavigate();
  const [issuances, setIssuances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedIssuance, setSelectedIssuance] = useState(null);
  const toastShownRef = useRef(false);
  useEffect(() => {
    fetchIssuances();
  }, []);
  useEffect(() => {
      if (!toastShownRef.current && issuances.length > 0) {
        toast.success("Issuances loaded successfully!", { position: "top-right" });
        toastShownRef.current = true; // Mark toast as shown
      }
    }, [issuances]); // Run only when issuances change

  const fetchIssuances = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/issuance`, {
        headers: { "x-api-key": import.meta.env.VITE_API_KEY },
      });
      setIssuances(response.data);
      console.log(response.data)
      toast.success("Issuances loaded successfully!", { position: "top-right" });
    } catch (error) {
      toast.error("Error fetching issuances!", { position: "top-right" });
    }
    setLoading(false);
  };

  const openModal = (issuance) => {
    setSelectedIssuance(issuance);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedIssuance(null);
    setModalIsOpen(false);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/issuance/${selectedIssuance.issuance_id}`, {
        headers: { "x-api-key": import.meta.env.VITE_API_KEY },
      });
      setIssuances(issuances.filter((issuance) => issuance.issuance_id !== selectedIssuance.issuance_id));
      toast.success("Issuance deleted successfully!", { position: "top-right" });
    } catch (error) {
      toast.error("Error deleting issuance!", { position: "top-right" });
    }
    closeModal();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-6"
    >
      <h1 className="text-3xl font-bold text-center text-white mb-6 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 p-4 rounded-lg shadow-md">
        🔄 Issuance Management
      </h1>

      <div className="flex justify-end mb-4">
        <Link
          to="/issuance/add"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md transition transform hover:scale-105"
        >
          ➕ Issue a New Book
        </Link>
      </div>

      {loading ? (
        <p className="text-center text-gray-300">Loading issuances...</p>
      ) : issuances.length === 0 ? (
        <p className="text-center text-gray-400">No issuances available.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                <th className="p-3 text-left">📖 Book Name</th>
                <th className="p-3 text-left">👤 Member</th>
                <th className="p-3 text-left">📅 Issue Date</th>
                <th className="p-3 text-left">📆 Return Date</th>
                <th className="p-3 text-left">📌 Status</th>
                <th className="p-3 text-center">⚙ Actions</th>
              </tr>
            </thead>
            <tbody>
              {issuances.map((issuance, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b hover:bg-gray-100 transition"
                >
                  <td className="p-3">{issuance.book.book_name}</td>
                  <td className="p-3">{issuance.member.mem_name}</td>
                  <td className="p-3">{new Date(issuance.issuance_date).toLocaleDateString()}</td>
                  <td className="p-3">{new Date(issuance.target_return_date).toLocaleDateString()}</td>
                  <td className={`p-3 font-bold ${issuance.issuance_status === "pending" ? "text-red-500" : "text-green-500"}`}>
                    {issuance.issuance_status}
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => navigate(`/issuance/edit/${issuance.issuance_id}`)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg shadow-md transition transform hover:scale-105 mr-2"
                    >
                      ✏ Edit
                    </button>
                    <button
                      onClick={() => openModal(issuance)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow-md transition transform hover:scale-105"
                    >
                      🗑 Delete
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for Delete Confirmation */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="h-[150px] bg-white mt-[48vh]" style={modalStyles} ariaHideApp={false}>
        <h2 className="text-xl font-bold text-gray-800">Are you sure?</h2>
        <p className="text-gray-600 mb-4">
          Do you really want to delete the issuance for <strong>{selectedIssuance?.book_name}</strong>?
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition transform hover:scale-105"
          >
            Yes, Delete
          </button>
          <button
            onClick={closeModal}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition transform hover:scale-105"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </motion.div>
  );
};

export default IssuancePage;
