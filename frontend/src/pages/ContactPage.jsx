import { React, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("❌ Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      // Replace REACT_APP_API_BASE_URL with your actual backend URL in your .env file
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/contacts`,
        formData
      );
      toast.success("✅ Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending contact message:", error);
      toast.error("❌ Failed to send message. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-6 max-w-4xl"
    >
      <h1 className="text-3xl font-bold text-center text-white mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4 rounded-lg shadow-md">
        📞 Contact Us
      </h1>
      <div className="flex flex-col md:flex-row bg-white p-6 rounded-lg shadow-lg">
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="w-full md:w-2/3 p-4">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your message"
              rows="4"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition duration-300"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
        
        {/* Contact Information */}
        <div className="w-full md:w-1/3 p-4 flex flex-col justify-center items-center border-l md:border-l-2 border-gray-200">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Connect with Me</h2>
          <div className="flex flex-col space-y-4">
            <a href="mailto:harish.s@kalvium.community" className="text-blue-600 hover:underline text-lg flex items-center space-x-2">
              <FaEnvelope /> <span>Gmail</span>
            </a>
            <a href="https://www.linkedin.com/in/harish-karthick-s-45bb27276/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-lg flex items-center space-x-2">
              <FaLinkedin /> <span>LinkedIn</span>
            </a>
            <a href="https://github.com/HarishKarthickS" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-lg flex items-center space-x-2">
              <FaGithub /> <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactPage;
