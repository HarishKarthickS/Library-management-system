const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { log } = require('../utils/logger'); // Import both logger & log
const authMiddleware = require('../middleware/auth');

// Apply authentication middleware to all member routes
router.use(authMiddleware);

// ✅ GET all members
router.get('/', async (req, res) => {
  try {
    const members = await prisma.member.findMany();
    log("info", `Retrieved ${members.length} members`, "GET /member");
    res.json(members);
  } catch (error) {
    log("error", error.message, "GET /member");
    res.status(500).json({ error: error.message });
  }
});

// ✅ GET a single member by ID
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const member = await prisma.member.findUnique({
      where: { mem_id: id },
    });

    if (!member) {
      log("warn", `Member not found (ID: ${id})`, "GET /member/:id");
      return res.status(404).json({ error: 'Member not found' });
    }

    log("info", `Retrieved member details (ID: ${id})`, "GET /member/:id");
    res.json(member);
  } catch (error) {
    log("error", error.message, "GET /member/:id");
    res.status(500).json({ error: error.message });
  }
});

// ✅ POST create a new member
router.post('/', async (req, res) => {
  try {
    const { mem_name, mem_phone, mem_email } = req.body;
    if (!mem_name || !mem_phone || !mem_email) {
      log("warn", "Missing required fields", "POST /member");
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newMember = await prisma.member.create({
      data: {
        mem_name,
        mem_phone,
        mem_email,
      },
    });

    log("info", `Created new member: ${mem_name}`, "POST /member");
    res.status(201).json(newMember);
  } catch (error) {
    log("error", error.message, "POST /member");
    res.status(500).json({ error: error.message });
  }
});

// ✅ PUT update an existing member
router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { mem_name, mem_phone, mem_email } = req.body;

    const updatedMember = await prisma.member.update({
      where: { mem_id: id },
      data: { mem_name, mem_phone, mem_email },
    });

    log("info", `Updated member details (ID: ${id})`, "PUT /member/:id");
    res.json(updatedMember);
  } catch (error) {
    log("error", error.message, "PUT /member/:id");
    res.status(500).json({ error: error.message });
  }
});

// ✅ DELETE a member
router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      log("warn", `Invalid member ID: ${id}`, "DELETE /member/:id");
      return res.status(400).json({ error: 'Invalid member ID' });
    }

    const existingMember = await prisma.member.findUnique({
      where: { mem_id: id },
    });

    if (!existingMember) {
      log("warn", `Member not found (ID: ${id})`, "DELETE /member/:id");
      return res.status(404).json({ error: 'Member not found' });
    }

    await prisma.member.delete({
      where: { mem_id: id },
    });

    log("info", `Deleted member (ID: ${id})`, "DELETE /member/:id");
    res.json({ message: 'Member deleted successfully' });
  } catch (error) {
    log("error", error.message, "DELETE /member/:id");
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
