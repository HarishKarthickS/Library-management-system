const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { log } = require('../utils/logger'); // Import logger & log function

const prisma = new PrismaClient();
const router = express.Router();

// ✅ GET All Categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    log("info", `Fetched ${categories.length} categories`, "GET /categories");
    res.json(categories);
  } catch (error) {
    log("error", error.message, "GET /categories");
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ✅ GET All Collections
router.get('/collections', async (req, res) => {
  try {
    const collections = await prisma.collection.findMany();
    log("info", `Fetched ${collections.length} collections`, "GET /collections");
    res.json(collections);
  } catch (error) {
    log("error", error.message, "GET /collections");
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
