import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

const BookForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get book ID for edit mode

  const [formData, setFormData] = useState({
    book_name: "",
    book_cat_id: "",
    book_collection_id: "",
    book_launch_date: "",
    book_publisher: "",
  });

  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchDropdownData();
    if (id) {
      fetchBookDetails(id);
      setIsEdit(true);
    }
  }, [id]);

  const fetchDropdownData = async () => {
    try {
      const [catRes, colRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/categories`, {
          headers: { "x-api-key": import.meta.env.VITE_API_KEY },
        }),
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/collections`, {
          headers: { "x-api-key": import.meta.env.VITE_API_KEY },
        }),
      ]);
      setCategories(catRes.data);
      console.log(catRes.data);
      console.log(colRes.data);
      setCollections(colRes.data);
    } catch (error) {
      toast.error("Failed to fetch categories or collections!", { position: "top-right" });
    }
  };

  const fetchBookDetails = async (bookId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/book/${bookId}`, {
        headers: { "x-api-key": import.meta.env.VITE_API_KEY },
      });
      setFormData(response.data);
    } catch (error) {
      toast.error("Error fetching book details.", { position: "top-right" });
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
        ? `${import.meta.env.VITE_API_BASE_URL}/book/${id}`
        : `${import.meta.env.VITE_API_BASE_URL}/book`;
      const method = isEdit ? "put" : "post";

      await axios[method](url, formData, {
        headers: { "x-api-key": import.meta.env.VITE_API_KEY },
      });

      toast.success(isEdit ? "Book updated successfully!" : "Book added successfully!", {
        position: "top-right",
      });

      setTimeout(() => navigate("/books"), 1500);
    } catch (error) {
      toast.error("Error submitting book. Please try again.", { position: "top-right" });
    }

    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-lg mx-auto p-6 bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 shadow-lg rounded-2xl text-white"
    >
      <h2 className="text-2xl font-extrabold text-center mb-4">
        {isEdit ? "✍ Edit Book" : "📚 Add New Book"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Book Name */}
        <div>
          <label className="block font-semibold text-lg">Book Name</label>
          <input
            type="text"
            name="book_name"
            value={formData.book_name}
            onChange={handleChange}
            required
            className="w-full p-3 bg-white text-gray-900 rounded-md shadow-md focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block font-semibold text-lg">Category</label>
          <select
            name="book_cat_id"
            value={formData.book_cat_id}
            onChange={handleChange}
            required
            className="w-full p-3 bg-white text-gray-900 rounded-md shadow-md focus:ring-2 focus:ring-indigo-300"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.cat_id} value={category.cat_id}>
                {category.cat_name}
              </option>
            ))}
          </select>
        </div>

        {/* Collection Dropdown */}
        <div>
          <label className="block font-semibold text-lg">Collection</label>
          <select
            name="book_collection_id"
            value={formData.book_collection_id}
            onChange={handleChange}
            required
            className="w-full p-3 bg-white text-gray-900 rounded-md shadow-md focus:ring-2 focus:ring-indigo-300"
          >
            <option value="">Select Collection</option>
            {collections.map((collection) => (
              <option key={collection.collection_id} value={collection.collection_id}>
                {collection.collection_name}
              </option>
            ))}
          </select>
        </div>

        {/* Launch Date */}
        <div>
          <label className="block font-semibold text-lg">Launch Date</label>
          <input
            type="date"
            name="book_launch_date"
            value={formData.book_launch_date}
            onChange={handleChange}
            required
            className="w-full p-3 bg-white text-gray-900 rounded-md shadow-md focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        {/* Publisher */}
        <div>
          <label className="block font-semibold text-lg">Publisher</label>
          <input
            type="text"
            name="book_publisher"
            value={formData.book_publisher}
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
            {loading ? "Submitting..." : isEdit ? "Update Book" : "Add Book"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/books")}
            className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded-lg shadow-md transition transform hover:scale-105"
          >
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default BookForm;
