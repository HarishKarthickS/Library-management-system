const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { log } = require('../utils/logger');

// POST - Create a new contact message (Public)
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const newContact = await prisma.contact.create({
      data: { name, email, message },
    });
    log('info', `New contact message received from ${name}`, 'POST /contacts');
    res.status(201).json(newContact);
  } catch (error) {
    log('error', error.message, 'POST /contacts');
    res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
});

// GET - Retrieve all contact messages (Optional: protect this route if needed)
router.get('/', async (req, res) => {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' },
    });
    log('info', `Fetched ${contacts.length} contact messages`, 'GET /contacts');
    res.json(contacts);
  } catch (error) {
    log('error', error.message, 'GET /contacts');
    res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
});

// GET - Retrieve a single contact message by ID (Optional: protect this route if needed)
router.get('/:id', async (req, res) => {
  try {
    const contactId = parseInt(req.params.id);
    if (isNaN(contactId)) {
      return res.status(400).json({ error: 'Invalid contact id' });
    }
    const contact = await prisma.contact.findUnique({
      where: { contact_id: contactId },
    });
    if (!contact) {
      return res.status(404).json({ error: 'Contact message not found' });
    }
    log('info', `Fetched contact message with id ${contactId}`, 'GET /contacts/:id');
    res.json(contact);
  } catch (error) {
    log('error', error.message, 'GET /contacts/:id');
    res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
});

// DELETE - Remove a contact message by ID (Optional: protect this route if needed)
router.delete('/:id', async (req, res) => {
  try {
    const contactId = parseInt(req.params.id);
    if (isNaN(contactId)) {
      return res.status(400).json({ error: 'Invalid contact id' });
    }
    const contact = await prisma.contact.findUnique({
      where: { contact_id: contactId },
    });
    if (!contact) {
      return res.status(404).json({ error: 'Contact message not found' });
    }
    await prisma.contact.delete({
      where: { contact_id: contactId },
    });
    log('info', `Deleted contact message with id ${contactId}`, 'DELETE /contacts/:id');
    res.json({ message: 'Contact message deleted successfully' });
  } catch (error) {
    log('error', error.message, 'DELETE /contacts/:id');
    res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
});

module.exports = router;
