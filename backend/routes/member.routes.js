const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authMiddleware = require('../middleware/auth');

// Apply authentication middleware to all member routes
router.use(authMiddleware);

// GET all members
router.get('/', async (req, res) => {
  try {
    const members = await prisma.member.findMany();
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET a single member by ID
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const member = await prisma.member.findUnique({
      where: { mem_id: id },
    });
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }
    res.json(member);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create a new member
router.post('/', async (req, res) => {
  try {
    const { mem_name, mem_phone, mem_email } = req.body;
    if (!mem_name || !mem_phone || !mem_email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const newMember = await prisma.member.create({
      data: {
        mem_name,
        mem_phone,
        mem_email,
      },
    });
    res.status(201).json(newMember);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update an existing member
router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { mem_name, mem_phone, mem_email } = req.body;
    const updatedMember = await prisma.member.update({
      where: { mem_id: id },
      data: { mem_name, mem_phone, mem_email },
    });
    res.json(updatedMember);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
