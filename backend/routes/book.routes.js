const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const authMiddleware = require("../middleware/auth");
const { log } = require("../utils/logger");

// Apply authentication middleware to secure only protected routes
const protectedRoutes = ["POST", "PUT", "DELETE"];
router.use((req, res, next) => {
  if (protectedRoutes.includes(req.method)) {
    authMiddleware(req, res, next);
  } else {
    next();
  }
});

// ✅ GET all books (Public)
router.get("/", async (req, res) => {
  try {
    const books = await prisma.book.findMany({
      include: { category: true, collection: true },
    });
    log("info", `Fetched ${books.length} books`, "GET /books");
    res.json(books);
  } catch (error) {
    log("error", error.message, "GET /books");
    res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
});

// ✅ GET a single book by ID (Public)
router.get("/:id", async (req, res) => {
  try {
    const bookId = parseInt(req.params.id);
    if (Number.isNaN(bookId)) {
      log("warn", "Invalid book ID", `GET /books/${req.params.id}`);
      return res.status(400).json({ error: "Invalid book ID" });
    }
    const book = await prisma.book.findUnique({
      where: { book_id: bookId },
      include: { category: true, collection: true },
    });
    if (!book) {
      log("warn", "Book not found", `GET /books/${bookId}`);
      return res.status(404).json({ error: "Book not found" });
    }
    log("info", "Book retrieved successfully", `GET /books/${bookId}`);
    res.json(book);
  } catch (error) {
    log("error", error.message, `GET /books/${req.params.id}`);
    res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
});

// ✅ POST - Create a new book (Protected)
router.post("/", async (req, res) => {
  try {
    const { book_name, book_cat_id, book_collection_id, book_launch_date, book_publisher } = req.body;

    if (!book_name || !book_cat_id || !book_collection_id || !book_launch_date || !book_publisher) {
      log("warn", "Missing required fields", "POST /books");
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Convert IDs to numbers
    const categoryId = Number(book_cat_id);
    const collectionId = Number(book_collection_id);

    // First, get the category using the correct field (cat_id)
    const category = await prisma.category.findUnique({
      where: { cat_id: categoryId },
    });
    if (!category) {
      return res.status(400).json({ error: "Invalid category ID" });
    }

    // Then, get the collection using its correct field (collection_id)
    const collection = await prisma.collection.findUnique({
      where: { collection_id: collectionId },
    });
    if (!collection) {
      return res.status(400).json({ error: "Invalid collection ID" });
    }

    // Create the new book
    const newBook = await prisma.book.create({
      data: {
        book_name,
        book_cat_id: category.cat_id, // using the retrieved category id
        book_collection_id: collection.collection_id, // using the retrieved collection id
        book_launch_date: new Date(book_launch_date),
        book_publisher,
      },
    });

    log("info", `New book added: ${book_name}`, "POST /books");
    res.status(201).json(newBook);
  } catch (error) {
    log("error", error.message, "POST /books");
    res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
});

// ✅ PUT - Update an existing book (Protected)
router.put("/:id", async (req, res) => {
  try {
    const bookId = parseInt(req.params.id);
    if (Number.isNaN(bookId)) {
      log("warn", "Invalid book ID", `PUT /books/${req.params.id}`);
      return res.status(400).json({ error: "Invalid book ID" });
    }

    const existingBook = await prisma.book.findUnique({ where: { book_id: bookId } });
    if (!existingBook) {
      log("warn", "Book not found", `PUT /books/${bookId}`);
      return res.status(404).json({ error: "Book not found" });
    }

    const { book_name, book_cat_id, book_collection_id, book_launch_date, book_publisher } = req.body;
    const updatedData = {};

    if (book_name) updatedData.book_name = book_name;

    if (book_cat_id) {
      const categoryId = Number(book_cat_id);
      const category = await prisma.category.findUnique({
        where: { cat_id: categoryId },
      });
      if (!category) {
        return res.status(400).json({ error: "Invalid category ID" });
      }
      updatedData.book_cat_id = categoryId;
    }

    if (book_collection_id) {
      const collectionId = Number(book_collection_id);
      const collection = await prisma.collection.findUnique({
        where: { collection_id: collectionId },
      });
      if (!collection) {
        return res.status(400).json({ error: "Invalid collection ID" });
      }
      updatedData.book_collection_id = collectionId;
    }

    if (book_launch_date) updatedData.book_launch_date = new Date(book_launch_date);
    if (book_publisher) updatedData.book_publisher = book_publisher;

    const updatedBook = await prisma.book.update({
      where: { book_id: bookId },
      data: updatedData,
    });

    log("info", "Book updated successfully", `PUT /books/${bookId}`);
    res.json(updatedBook);
  } catch (error) {
    log("error", error.message, `PUT /books/${req.params.id}`);
    res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
});

// ✅ DELETE - Remove a book (Protected)
router.delete("/:id", async (req, res) => {
  try {
    const bookId = parseInt(req.params.id);
    if (Number.isNaN(bookId)) {
      log("warn", "Invalid book ID", `DELETE /books/${req.params.id}`);
      return res.status(400).json({ error: "Invalid book ID" });
    }

    const existingBook = await prisma.book.findUnique({ where: { book_id: bookId } });
    if (!existingBook) {
      log("warn", "Book not found", `DELETE /books/${bookId}`);
      return res.status(404).json({ error: "Book not found" });
    }

    await prisma.book.delete({
      where: { book_id: bookId },
    });

    log("info", "Book deleted successfully", `DELETE /books/${bookId}`);
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    log("error", error.message, `DELETE /books/${req.params.id}`);
    res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
});

module.exports = router;
