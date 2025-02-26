const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { log } = require('../utils/logger'); // Import both logger & log
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
    log("info", "Fetching books never borrowed", "GET /reports/never-borrowed");

    const books = await getNeverBorrowedBooks();
    res.json(books);

    log("info", `Retrieved ${books.length} books`, "GET /reports/never-borrowed");
  } catch (error) {
    log("error", error.message, "GET /reports/never-borrowed");
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ✅ GET Outstanding Books (Not Yet Returned)
router.get('/outstanding-books', async (req, res) => {
  try {
    log("info", "Fetching outstanding books", "GET /reports/outstanding-books");

    const books = await getOutstandingBooks();
    res.json(books);

    log("info", `Retrieved ${books.length} outstanding books`, "GET /reports/outstanding-books");
  } catch (error) {
    log("error", error.message, "GET /reports/outstanding-books");
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ✅ GET Top 10 Most Borrowed Books
router.get('/top-borrowed-books', async (req, res) => {
  try {
    log("info", "Fetching top 10 borrowed books", "GET /reports/top-borrowed-books");

    const books = await getTopBorrowedBooks();
    res.json(books);

    log("info", `Retrieved ${books.length} top borrowed books`, "GET /reports/top-borrowed-books");
  } catch (error) {
    log("error", error.message, "GET /reports/top-borrowed-books");
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
