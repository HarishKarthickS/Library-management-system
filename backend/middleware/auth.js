require('dotenv').config();
const { log } = require('../utils/logger');

module.exports = (req, res, next) => {
  const apiKey = req.header('x-api-key'); // Get API key from request headers

  if (!apiKey) {
    log('warn', 'Unauthorized access attempt: Missing API Key', 'authMiddleware');
    return res.status(401).json({ error: 'Unauthorized: API Key is missing' });
  }

  if (apiKey !== process.env.API_KEY) {
    log('warn', 'Forbidden access attempt: Invalid API Key', 'authMiddleware');
    return res.status(403).json({ error: 'Forbidden: Invalid API Key' });
  }

  log('info', 'API authentication successful', 'authMiddleware');

  next(); // Continue to the next middleware or route handler
};
