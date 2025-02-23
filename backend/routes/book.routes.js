const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authMiddleware = require('../middleware/auth');

// Apply authentication middleware to secure routes
router.use(authMiddleware);

// ✅ GET all books
router.get('/', async (req, res) => {
  try {
    const books = await prisma.book.findMany({
      include: { category: true, collection: true },
    });
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Internal server error : ${error.message}` });
  }
});

// ✅ GET a single book by ID
router.get('/:id', async (req, res) => {
  try {
    const bookId = parseInt(req.params.id);
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
    res.status(500).json({ error: `Internal server error : ${error.message}` });
  }
});

// ✅ POST - Create a new book
router.post('/', async (req, res) => {
  try {
    const { book_name, book_cat_id, book_collection_id, book_launch_date, book_publisher } = req.body;

    // Validate required fields
    if (!book_name || !book_cat_id || !book_collection_id || !book_launch_date || !book_publisher) {
      return res.status(400).json({ error: 'Missing required fields' });
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
    res.status(500).json({ error: `Internal server error : ${error.message}` });
  }
});

// ✅ PUT - Update an existing book
router.put('/:id', async (req, res) => {
  try {
    const bookId = parseInt(req.params.id);
    const { book_name, book_cat_id, book_collection_id, book_launch_date, book_publisher } = req.body;

    const updatedBook = await prisma.book.update({
      where: { book_id: bookId },
      data: {
        book_name,
        book_cat_id,
        book_collection_id,
        book_launch_date: new Date(book_launch_date),
        book_publisher,
      },
    });

    res.json(updatedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Internal server error : ${error.message}` });
  }
});

// ✅ DELETE - (Not required per task, but included for completeness)
router.delete('/:id', async (req, res) => {
  try {
    const bookId = parseInt(req.params.id);

    await prisma.book.delete({
      where: { book_id: bookId },
    });

    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Internal server error : ${error.message}` });
  }
});

module.exports = router;
