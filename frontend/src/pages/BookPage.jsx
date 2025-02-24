import {React, useEffect, useState ,useRef} from "react";
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
    history: "150px",
    margin: "auto",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    backgroundColor: "#fff",
  },
};

const BookPage = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const toastShownRef = useRef(false); 

  useEffect(() => {
    fetchBooks();
  }, []);
  
  useEffect(() => {
    if (!toastShownRef.current && books.length > 0) {
      toast.success("Books loaded successfully!", { position: "top-right" });
      toastShownRef.current = true; // Mark toast as shown
    }
  }, [books]); // Run only when books change
  

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/book`, {
        headers: { "x-api-key": import.meta.env.VITE_API_KEY },
      });
      setBooks(response.data);
    } catch (error) {
      toast.error("Error fetching books!", { position: "top-right" });
    }
    setLoading(false);
  };

  const openModal = (book) => {
    setSelectedBook(book);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedBook(null);
    setModalIsOpen(false);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/book/${selectedBook.book_id}`, {
        headers: { "x-api-key": import.meta.env.VITE_API_KEY },
      });
      setBooks(books.filter((book) => book.book_id !== selectedBook.book_id));
      toast.success("Book deleted successfully!", { position: "top-right" });
    } catch (error) {
      toast.error("Error deleting book!", { position: "top-right" });
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
      <h1 className="text-3xl font-bold text-center text-white mb-6 bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 p-4 rounded-lg shadow-md">
        📚 Book Management
      </h1>
      

      <div className="flex justify-end mb-4">
        <Link
          to="/books/add"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md transition transform hover:scale-105"
        >
          ➕ Add New Book
        </Link>
      </div>

      {loading ? (
        <p className="text-center text-gray-300">Loading books...</p>
      ) : books.length === 0 ? (
        <p className="text-center text-gray-400">No books available.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                <th className="p-3 text-left">📖 Book Name</th>
                <th className="p-3 text-left">📂 Category</th>
                <th className="p-3 text-left">📚 Collection</th>
                <th className="p-3 text-left">📅 Launch Date</th>
                <th className="p-3 text-left">🏢 Publisher</th>
                <th className="p-3 text-center">⚙ Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b hover:bg-gray-100 transition"
                >
                  <td className="p-3">{book.book_name}</td>
                  <td className="p-3">{book.category?.cat_name || "N/A"}</td>
                  <td className="p-3">{book.collection?.collection_name || "N/A"}</td>
                  <td className="p-3">{book.book_launch_date ? new Date(book.book_launch_date).toLocaleDateString() : "N/A"}</td>
                  <td className="p-3">{book.book_publisher}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => navigate(`/books/edit/${book.book_id}`)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg shadow-md transition transform hover:scale-105 mr-2"
                    >
                      ✏ Edit
                    </button>
                    <button
                      onClick={() => openModal(book)}
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
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyles} className="h-[150px] bg-white mt-[48vh]" ariaHideApp={false}>
        <h2 className="text-xl font-bold text-gray-800">Are you sure?</h2>
        <p className="text-gray-600 mb-4">Do you really want to delete <strong>{selectedBook?.book_name}</strong>?</p>
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

export default BookPage;
