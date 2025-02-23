import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";



const IssuanceForm = ({ issuanceToEdit, onFormSubmit }) => {
  const navigate = useNavigate();

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

  useEffect(() => {
    if (issuanceToEdit) {
      setFormData(issuanceToEdit);
    }
  }, [issuanceToEdit]);

  useEffect(() => {
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

    fetchDropdownData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = issuanceToEdit
        ? `${import.meta.env.VITE_API_BASE_URL}/issuance/${issuanceToEdit.issuance_id}`
        : `${import.meta.env.VITE_API_BASE_URL}/issuance`;
      const method = issuanceToEdit ? "put" : "post";

      const response = await axios[method](url, formData, {
        headers: { "x-api-key": import.meta.env.VITE_API_KEY },
      });

      toast.success(issuanceToEdit ? "Issuance updated successfully!" : "Book issued successfully!", { position: "top-right" });
      onFormSubmit(response.data);

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
        {issuanceToEdit ? "✍ Edit Issuance" : "📖 Issue a Book"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Book Dropdown */}
        <div className="relative">
          <label className="absolute -top-3 left-3 bg-purple-500 px-2 text-xs rounded-md shadow-md">
            Select Book
          </label>
          <select
            name="book_id"
            value={formData.book_id}
            onChange={handleChange}
            required
            className="block w-full border-none rounded-md bg-white text-gray-900 p-3 focus:ring-2 focus:ring-indigo-300"
          >
            <option value="">Choose a Book</option>
            {books.map((book) => (
              <option key={book.book_id} value={book.book_id}>
                {book.book_name}
              </option>
            ))}
          </select>
        </div>

        {/* Member Dropdown */}
        <div className="relative">
          <label className="absolute -top-3 left-3 bg-purple-500 px-2 text-xs rounded-md shadow-md">
            Select Member
          </label>
          <select
            name="issuance_member"
            value={formData.issuance_member}
            onChange={handleChange}
            required
            className="block w-full border-none rounded-md bg-white text-gray-900 p-3 focus:ring-2 focus:ring-indigo-300"
          >
            <option value="">Choose a Member</option>
            {members.map((member) => (
              <option key={member.mem_id} value={member.mem_id}>
                {member.mem_name}
              </option>
            ))}
          </select>
        </div>

        {/* Issuance Date */}
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

        {/* Return Date */}
        <div>
          <label className="block font-semibold text-lg">Return Date</label>
          <input
            type="date"
            name="target_return_date"
            value={formData.target_return_date}
            onChange={handleChange}
            required
            className="w-full p-3 bg-white text-gray-900 rounded-md shadow-md focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        {/* Issued By */}
        <div>
          <label className="block font-semibold text-lg">Issued By</label>
          <input
            type="text"
            name="issued_by"
            value={formData.issued_by}
            onChange={handleChange}
            required
            className="w-full p-3 bg-white text-gray-900 rounded-md shadow-md focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        {/* Submit & Cancel Buttons */}
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow-md transition transform hover:scale-105"
            disabled={loading}
          >
            {loading ? "Processing..." : issuanceToEdit ? "Update Issuance" : "Issue Book"}
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
