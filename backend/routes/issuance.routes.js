const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { log } = require('../utils/logger'); // Import logger & log function
const authMiddleware = require('../middleware/auth');

// Apply authentication middleware to secure routes
router.use(authMiddleware);

// ✅ GET all issuance records
router.get('/', async (req, res) => {
  try {
    const issuances = await prisma.issuance.findMany({
      include: {
        book: true,
        member: true,
      },
    });
    log("info", `Fetched ${issuances.length} issuance records`, "GET /issuance");
    res.json(issuances);
  } catch (error) {
    log("error", error.message, "GET /issuance");
    res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
});

// ✅ GET a single issuance record by ID
router.get('/:id', async (req, res) => {
  try {
    const issuanceId = parseInt(req.params.id);
    if (Number.isNaN(issuanceId)) {
      log("warn", `Invalid issuance ID: ${req.params.id}`, "GET /issuance/:id");
      return res.status(400).json({ error: 'Invalid issuance ID' });
    }
    const issuance = await prisma.issuance.findUnique({
      where: { issuance_id: issuanceId },
      include: {
        book: true,
        member: true,
      },
    });
    if (!issuance) {
      log("warn", `Issuance record not found (ID: ${issuanceId})`, "GET /issuance/:id");
      return res.status(404).json({ error: 'Issuance record not found' });
    }
    log("info", `Retrieved issuance record (ID: ${issuanceId})`, "GET /issuance/:id");
    res.json(issuance);
  } catch (error) {
    log("error", error.message, "GET /issuance/:id");
    res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
});

// ✅ POST - Create a new issuance record
router.post('/', async (req, res) => {
  try {
    const { book_id, issuance_member, issued_by, target_return_date, issuance_status } = req.body;

    if (!book_id || !issuance_member || !issued_by || !target_return_date || !issuance_status) {
      log("warn", "Missing required fields", "POST /issuance");
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Convert IDs to numbers
    const bookId = Number(book_id);
    const memberId = Number(issuance_member);

    // Validate that the referenced book exists
    log("info", `Looking up book with book_id: ${bookId}`, "POST /issuance");
    const book = await prisma.book.findUnique({
      where: { book_id: bookId },
    });
    if (!book) {
      return res.status(400).json({ error: "Invalid book ID" });
    }

    // Validate that the referenced member exists using member.mem_id
    log("info", `Looking up member with mem_id: ${memberId}`, "POST /issuance");
    const member = await prisma.member.findUnique({
      where: { mem_id: memberId },
    });
    if (!member) {
      return res.status(400).json({ error: "Invalid member ID" });
    }

    const newIssuance = await prisma.issuance.create({
      data: {
        book_id: bookId,
        issuance_member: memberId,
        issued_by,
        issuance_date: new Date(), // Automatically set issuance date
        target_return_date: new Date(target_return_date),
        issuance_status,
      },
    });

    log("info", `Created new issuance record for book ID ${bookId}`, "POST /issuance");
    res.status(201).json(newIssuance);
  } catch (error) {
    log("error", error.message, "POST /issuance");
    res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
});

// ✅ PUT - Update an issuance record
router.put('/:id', async (req, res) => {
  try {
    const issuanceId = parseInt(req.params.id);
    if (Number.isNaN(issuanceId)) {
      log("warn", `Invalid issuance ID: ${req.params.id}`, "PUT /issuance/:id");
      return res.status(400).json({ error: 'Invalid issuance ID' });
    }

    // Verify the issuance record exists
    const existingIssuance = await prisma.issuance.findUnique({
      where: { issuance_id: issuanceId },
    });
    if (!existingIssuance) {
      log("warn", `Issuance record not found (ID: ${issuanceId})`, "PUT /issuance/:id");
      return res.status(404).json({ error: 'Issuance record not found' });
    }

    const { book_id, issuance_member, issued_by, target_return_date, issuance_status } = req.body;
    const updatedData = {};

    if (book_id) {
      const bookId = Number(book_id);
      log("info", `Looking up book with book_id: ${bookId}`, "PUT /issuance/:id");
      const book = await prisma.book.findUnique({
        where: { book_id: bookId },
      });
      if (!book) {
        return res.status(400).json({ error: "Invalid book ID" });
      }
      updatedData.book_id = bookId;
    }

    if (issuance_member) {
      const memberId = Number(issuance_member);
      log("info", `Looking up member with mem_id: ${memberId}`, "PUT /issuance/:id");
      const member = await prisma.member.findUnique({
        where: { mem_id: memberId },
      });
      if (!member) {
        return res.status(400).json({ error: "Invalid member ID" });
      }
      updatedData.issuance_member = memberId;
    }

    if (issued_by) updatedData.issued_by = issued_by;
    if (target_return_date) updatedData.target_return_date = new Date(target_return_date);
    if (issuance_status) updatedData.issuance_status = issuance_status;

    const updatedIssuance = await prisma.issuance.update({
      where: { issuance_id: issuanceId },
      data: updatedData,
    });

    log("info", `Updated issuance record (ID: ${issuanceId})`, "PUT /issuance/:id");
    res.json(updatedIssuance);
  } catch (error) {
    log("error", error.message, "PUT /issuance/:id");
    res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
});

// ✅ DELETE - Remove an issuance record
router.delete('/:id', async (req, res) => {
  try {
    const issuanceId = parseInt(req.params.id);
    if (isNaN(issuanceId)) {
      log("warn", `Invalid issuance ID: ${req.params.id}`, "DELETE /issuance/:id");
      return res.status(400).json({ error: 'Invalid issuance ID' });
    }

    const existingIssuance = await prisma.issuance.findUnique({
      where: { issuance_id: issuanceId },
    });
    if (!existingIssuance) {
      log("warn", `Issuance record not found (ID: ${issuanceId})`, "DELETE /issuance/:id");
      return res.status(404).json({ error: 'Issuance record not found' });
    }

    await prisma.issuance.delete({
      where: { issuance_id: issuanceId },
    });

    log("info", `Deleted issuance record (ID: ${issuanceId})`, "DELETE /issuance/:id");
    res.json({ message: 'Issuance record deleted successfully' });
  } catch (error) {
    log("error", error.message, "DELETE /issuance/:id");
    res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
});

module.exports = router;
