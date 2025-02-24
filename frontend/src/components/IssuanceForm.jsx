import { React, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

const IssuanceForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get issuance ID for edit mode

  const [formData, setFormData] = useState({
    book_id: "",
    issuance_member: "",
    issuance_date: new Date().toISOString().split("T")[0],
    target_return_date: "",
    issued_by: "Librarian A",
    issuance_status: "pending",
  });

  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchDropdownData();
    if (id) {
      fetchIssuanceDetails(id);
      setIsEdit(true);
    }
  }, [id]);

  const fetchDropdownData = async () => {
    try {
      const [booksRes, membersRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/book`, {
          headers: { "x-api-key": import.meta.env.VITE_API_KEY },
        }),
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/member`, {
          headers: { "x-api-key": import.meta.env.VITE_API_KEY },
        }),
      ]);
      setBooks(booksRes.data);
      setMembers(membersRes.data);
    } catch (error) {
      toast.error("Failed to fetch books or members!", { position: "top-right" });
    }
  };

  const fetchIssuanceDetails = async (issuanceId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/issuance/${issuanceId}`, {
        headers: { "x-api-key": import.meta.env.VITE_API_KEY },
      });
      setFormData({ 
        ...response.data, 
        issuance_date: response.data.issuance_date.split("T")[0], 
        target_return_date: response.data.target_return_date.split("T")[0] 
      });
    } catch (error) {
      toast.error("Error fetching issuance details.", { position: "top-right" });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isEdit
        ? `${import.meta.env.VITE_API_BASE_URL}/issuance/${id}`
        : `${import.meta.env.VITE_API_BASE_URL}/issuance`;
      const method = isEdit ? "put" : "post";

      await axios[method](url, formData, {
        headers: { "x-api-key": import.meta.env.VITE_API_KEY },
      });

      toast.success(isEdit ? "Issuance updated successfully!" : "Book issued successfully!", {
        position: "top-right",
      });

      setTimeout(() => navigate("/issuance"), 1500);
    } catch (error) {
      toast.error("Error processing issuance. Please try again.", { position: "top-right" });
    }

    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-lg mx-auto p-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg rounded-2xl text-white"
    >
      <h2 className="text-2xl font-extrabold text-center mb-4">
        {isEdit ? "✍ Edit Issuance" : "📖 Issue a Book"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-semibold text-lg">Select Book</label>
          <select
            name="book_id"
            value={formData.book_id}
            onChange={handleChange}
            required
            className="w-full p-3 bg-white text-gray-900 rounded-md shadow-md focus:ring-2 focus:ring-indigo-300"
          >
            <option value="">Choose a Book</option>
            {books.map((book) => (
              <option key={book.book_id} value={book.book_id}>
                {book.book_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold text-lg">Select Member</label>
          <select
            name="issuance_member"
            value={formData.issuance_member}
            onChange={handleChange}
            required
            className="w-full p-3 bg-white text-gray-900 rounded-md shadow-md focus:ring-2 focus:ring-indigo-300"
          >
            <option value="">Choose a Member</option>
            {members.map((member) => (
              <option key={member.mem_id} value={member.mem_id}>
                {member.mem_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold text-lg">Issuance Date</label>
          <input
            type="date"
            name="issuance_date"
            value={formData.issuance_date}
            onChange={handleChange}
            required
            className="w-full p-3 bg-white text-gray-900 rounded-md shadow-md focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        <div>
          <label className="block font-semibold text-lg">Target Return Date</label>
          <input
            type="date"
            name="target_return_date"
            value={formData.target_return_date}
            onChange={handleChange}
            required
            className="w-full p-3 bg-white text-gray-900 rounded-md shadow-md focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        <div>
          <label className="block font-semibold text-lg">Issuance Status</label>
          <select
            name="issuance_status"
            value={formData.issuance_status}
            onChange={handleChange}
            required
            className="w-full p-3 bg-white text-gray-900 rounded-md shadow-md focus:ring-2 focus:ring-indigo-300"
          >
            <option value="pending">Pending</option>
            <option value="issued">Issued</option>
            <option value="returned">Returned</option>
          </select>
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow-md transition transform hover:scale-105"
            disabled={loading}
          >
            {loading ? "Processing..." : isEdit ? "Update Issuance" : "Issue Book"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/issuance")}
            className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded-lg shadow-md transition transform hover:scale-105"
          >
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default IssuanceForm;
