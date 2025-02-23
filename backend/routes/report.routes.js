const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { 
  getNeverBorrowedBooks, 
  getOutstandingBooks, 
  getTopBorrowedBooks 
} = require('../services/queryService');

// Apply authentication middleware
router.use(authMiddleware);

// ✅ GET Books Never Borrowed
router.get('/never-borrowed', async (req, res) => {
  try {
    const books = await getNeverBorrowedBooks();
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ✅ GET Outstanding Books (Not Yet Returned)
router.get('/outstanding-books', async (req, res) => {
  try {
    const books = await getOutstandingBooks();
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ✅ GET Top 10 Most Borrowed Books
router.get('/top-borrowed-books', async (req, res) => {
  try {
    const books = await getTopBorrowedBooks();
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
