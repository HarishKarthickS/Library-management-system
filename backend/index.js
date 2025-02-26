const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const { log } = require('./utils/logger'); // Import both logger & log

// Load environment variables
dotenv.config();

// Initialize Express App
const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS for frontend integration

// Import Routes
const memberRoutes = require('./routes/member.routes');
const bookRoutes = require('./routes/book.routes');
const issuanceRoutes = require('./routes/issuance.routes');
const reportRoutes = require('./routes/report.routes');
const categoryCollectionRoutes = require('./routes/categoryCollection.routes');
const contactRoutes = require('./routes/contact.route');


// API Endpoints
app.use('/contacts', contactRoutes);
app.use('/member', memberRoutes);
app.use('/book', bookRoutes);
app.use('/issuance', issuanceRoutes);
app.use('/reports', reportRoutes);
app.use('/', categoryCollectionRoutes);

// Base Route
app.get('/', (req, res) => {
  log("info", "Base route accessed", "GET /");
  res.json({ message: 'Library Management API is running!' });
});

// 404 Handler for Undefined Routes
app.use((req, res, next) => {
  log("warn", `404 Not Found - ${req.method} ${req.originalUrl}`, "Middleware");
  res.status(404).json({ error: 'Not Found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  log("error", `Internal Server Error - ${err.message}`, "Middleware");
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start Server
app.listen(PORT, async () => {
  log("info", `🚀 Server running on http://localhost:${PORT}`, "Startup");

  // Ensure database connection
  try {
    await prisma.$connect();
    log("info", "✅ Connected to Database", "Startup");
  } catch (error) {
    log("error", `❌ Database Connection Failed: ${error.message}`, "Startup");
    process.exit(1);
  }
});

// Graceful Shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  log("info", "🛑 Server shutting down...", "Shutdown");
  process.exit(0);
});

module.exports = app;
