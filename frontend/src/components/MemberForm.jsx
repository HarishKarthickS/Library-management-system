import { React,useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

const MemberForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get member ID for edit mode

  const [formData, setFormData] = useState({
    mem_name: "",
    mem_phone: "",
    mem_email: "",
  });

  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (id) {
      fetchMemberDetails(id);
      setIsEdit(true);
    }
  }, [id]);

  const fetchMemberDetails = async (memberId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/member/${memberId}`, {
        headers: { "x-api-key": import.meta.env.VITE_API_KEY },
      });
      setFormData(response.data);
    } catch (error) {
      toast.error("Error fetching member details.", { position: "top-right" });
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
        ? `${import.meta.env.VITE_API_BASE_URL}/member/${id}`
        : `${import.meta.env.VITE_API_BASE_URL}/member`;
      const method = isEdit ? "put" : "post";

      await axios[method](url, formData, {
        headers: { "x-api-key": import.meta.env.VITE_API_KEY },
      });

      toast.success(isEdit ? "Member updated successfully!" : "Member added successfully!", {
        position: "top-right",
      });

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
        {isEdit ? "👤 Edit Member" : "👥 Add New Member"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Member Name */}
        <div>
          <label className="block font-semibold text-lg">Member Name</label>
          <input
            type="text"
            name="mem_name"
            value={formData.mem_name}
            onChange={handleChange}
            required
            className="w-full p-3 bg-white text-gray-900 rounded-md shadow-md focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block font-semibold text-lg">Phone Number</label>
          <input
            type="text"
            name="mem_phone"
            value={formData.mem_phone}
            onChange={handleChange}
            required
            className="w-full p-3 bg-white text-gray-900 rounded-md shadow-md focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-semibold text-lg">Email</label>
          <input
            type="email"
            name="mem_email"
            value={formData.mem_email}
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
            {loading ? "Submitting..." : isEdit ? "Update Member" : "Add Member"}
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