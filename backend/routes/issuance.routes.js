const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
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
    res.json(issuances);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Internal server error : ${error.message}` });
  }
});

// ✅ GET a single issuance record by ID
router.get('/:id', async (req, res) => {
  try {
    const issuanceId = parseInt(req.params.id);
    const issuance = await prisma.issuance.findUnique({
      where: { issuance_id: issuanceId },
      include: {
        book: true,
        member: true,
      },
    });

    if (!issuance) {
      return res.status(404).json({ error: 'Issuance record not found' });
    }

    res.json(issuance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Internal server error : ${error.message}` });
  }
});

// ✅ POST - Create a new issuance record
router.post('/', async (req, res) => {
  try {
    const { book_id, issuance_member, issued_by, target_return_date, issuance_status } = req.body;

    // Validate required fields
    if (!book_id || !issuance_member || !issued_by || !target_return_date || !issuance_status) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newIssuance = await prisma.issuance.create({
      data: {
        book_id,
        issuance_member,
        issued_by,
        issuance_date: new Date(), // Automatically set issuance date to current date
        target_return_date: new Date(target_return_date),
        issuance_status,
      },
    });

    res.status(201).json(newIssuance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Internal server error : ${error.message}` });
  }
});

// ✅ PUT - Update an issuance record
router.put('/:id', async (req, res) => {
  try {
    const issuanceId = parseInt(req.params.id);
    const { book_id, issuance_member, issued_by, target_return_date, issuance_status } = req.body;

    const updatedIssuance = await prisma.issuance.update({
      where: { issuance_id: issuanceId },
      data: {
        book_id,
        issuance_member,
        issued_by,
        target_return_date: new Date(target_return_date),
        issuance_status,
      },
    });

    res.json(updatedIssuance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Internal server error : ${error.message}` });
  }
});

// ✅ DELETE - Remove an issuance record (Optional)
router.delete('/:id', async (req, res) => {
  try {
    const issuanceId = parseInt(req.params.id);

    await prisma.issuance.delete({
      where: { issuance_id: issuanceId },
    });

    res.json({ message: 'Issuance record deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Internal server error : ${error.message}` });
  }
});

module.exports = router;
