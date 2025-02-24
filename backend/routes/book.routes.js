const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authMiddleware = require('../middleware/auth');

// Apply authentication middleware to secure only protected routes
const protectedRoutes = ['POST', 'PUT', 'DELETE'];
router.use((req, res, next) => {
  if (protectedRoutes.includes(req.method)) {
    authMiddleware(req, res, next);
  } else {
    next();
  }
});

// ✅ GET all books (Public)
router.get('/', async (req, res) => {
  try {
    const books = await prisma.book.findMany({
      include: { category: true, collection: true },
    });
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
});

// ✅ GET a single book by ID (Public)
router.get('/:id', async (req, res) => {
  try {
    const bookId = parseInt(req.params.id);
    if (Number.isNaN(bookId)) {
      return res.status(400).json({ error: 'Invalid book ID' });
    }

    const book = await prisma.book.findUnique({
      where: { book_id: bookId },
      include: { category: true, collection: true },
    });

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
});

// ✅ POST - Create a new book (Protected)
router.post('/', async (req, res) => {
  try {
    const { book_name, book_cat_id, book_collection_id, book_launch_date, book_publisher } = req.body;

    if (!book_name || !book_cat_id || !book_collection_id || !book_launch_date || !book_publisher) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate foreign keys
    const categoryExists = await prisma.category.findUnique({ where: { id: book_cat_id } });
    const collectionExists = await prisma.collection.findUnique({ where: { id: book_collection_id } });

    if (!categoryExists || !collectionExists) {
      return res.status(400).json({ error: 'Invalid category or collection ID' });
    }

    const newBook = await prisma.book.create({
      data: {
        book_name,
        book_cat_id,
        book_collection_id,
        book_launch_date: new Date(book_launch_date),
        book_publisher,
      },
    });

    res.status(201).json(newBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
});

// ✅ PUT - Update an existing book (Protected)
router.put('/:id', async (req, res) => {
  try {
    const bookId = parseInt(req.params.id);
    if (Number.isNaN(bookId)) {
      return res.status(400).json({ error: 'Invalid book ID' });
    }

    const existingBook = await prisma.book.findUnique({ where: { book_id: bookId } });
    if (!existingBook) {
      return res.status(404).json({ error: 'Book not found' });
    }

    const { book_name, book_cat_id, book_collection_id, book_launch_date, book_publisher } = req.body;

    const updatedData = {};
    if (book_name) updatedData.book_name = book_name;
    if (book_cat_id) updatedData.book_cat_id = book_cat_id;
    if (book_collection_id) updatedData.book_collection_id = book_collection_id;
    if (book_launch_date) updatedData.book_launch_date = new Date(book_launch_date);
    if (book_publisher) updatedData.book_publisher = book_publisher;

    const updatedBook = await prisma.book.update({
      where: { book_id: bookId },
      data: updatedData,
    });

    res.json(updatedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
});

// ✅ DELETE - Remove a book (Protected)
router.delete('/:id', async (req, res) => {
  try {
    const bookId = parseInt(req.params.id);
    if (Number.isNaN(bookId)) {
      return res.status(400).json({ error: 'Invalid book ID' });
    }

    const existingBook = await prisma.book.findUnique({ where: { book_id: bookId } });
    if (!existingBook) {
      return res.status(404).json({ error: 'Book not found' });
    }

    await prisma.book.delete({
      where: { book_id: bookId },
    });

    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
});

module.exports = router;
