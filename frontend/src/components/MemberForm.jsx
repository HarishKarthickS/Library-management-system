import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";



const MemberForm = ({ memberToEdit, onFormSubmit }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    mem_name: "",
    mem_phone: "",
    mem_email: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (memberToEdit) {
      setFormData(memberToEdit);
    }
  }, [memberToEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = memberToEdit
        ? `${import.meta.env.VITE_API_BASE_URL}/member/${memberToEdit.mem_id}`
        : `${import.meta.env.VITE_API_BASE_URL}/member`;
      const method = memberToEdit ? "put" : "post";

      const response = await axios[method](url, formData, {
        headers: { "x-api-key": import.meta.env.VITE_API_KEY },
      });

      toast.success(memberToEdit ? "Member updated successfully!" : "Member added successfully!", { position: "top-right" });
      onFormSubmit(response.data);

      // Redirect back to members list after form submission
      setTimeout(() => navigate("/members"), 1500);
    } catch (error) {
      toast.error("Error submitting member. Please try again.", { position: "top-right" });
    }

    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-lg mx-auto p-6 bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 shadow-lg rounded-2xl text-white"
    >
      <h2 className="text-2xl font-extrabold text-center mb-4">
        {memberToEdit ? "👤 Edit Member" : "👥 Add New Member"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Member Name */}
        <div className="relative">
          <label className="absolute -top-3 left-3 bg-green-500 px-2 text-xs rounded-md shadow-md">
            Member Name
          </label>
          <input
            type="text"
            name="mem_name"
            value={formData.mem_name}
            onChange={handleChange}
            required
            className="block w-full border-none rounded-md bg-white text-gray-900 p-3 focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        {/* Phone Number */}
        <div className="relative">
          <label className="absolute -top-3 left-3 bg-green-500 px-2 text-xs rounded-md shadow-md">
            Phone Number
          </label>
          <input
            type="text"
            name="mem_phone"
            value={formData.mem_phone}
            onChange={handleChange}
            required
            className="block w-full border-none rounded-md bg-white text-gray-900 p-3 focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        {/* Email */}
        <div className="relative">
          <label className="absolute -top-3 left-3 bg-green-500 px-2 text-xs rounded-md shadow-md">
            Email
          </label>
          <input
            type="email"
            name="mem_email"
            value={formData.mem_email}
            onChange={handleChange}
            required
            className="block w-full border-none rounded-md bg-white text-gray-900 p-3 focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        {/* Submit & Cancel Buttons */}
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow-md transition transform hover:scale-105"
            disabled={loading}
          >
            {loading ? "Submitting..." : memberToEdit ? "Update Member" : "Add Member"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/members")}
            className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded-lg shadow-md transition transform hover:scale-105"
          >
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default MemberForm;
