const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

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

// API Endpoints
app.use('/member', memberRoutes);
app.use('/book', bookRoutes);
app.use('/issuance', issuanceRoutes);
app.use('/reports', reportRoutes);

// Base Route
app.get('/', (req, res) => {
  res.json({ message: 'Library Management API is running!' });
});

// 404 Handler for Undefined Routes
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start Server
app.listen(PORT, async () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);

  // Ensure database connection
  try {
    await prisma.$connect();
    console.log('✅ Connected to Database');
  } catch (error) {
    console.error('❌ Database Connection Failed:', error);
    process.exit(1);
  }
});

// Graceful Shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  console.log('🛑 Server shutting down...');
  process.exit(0);
});

module.exports = app;
