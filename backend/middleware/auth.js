require('dotenv').config();

module.exports = (req, res, next) => {
  const apiKey = req.header('x-api-key'); // Get API key from request headers

  if (!apiKey) {
    return res.status(401).json({ error: 'Unauthorized: API Key is missing' });
  }

  if (apiKey !== process.env.API_KEY) {
    return res.status(403).json({ error: 'Forbidden: Invalid API Key' });
  }

  next(); // Continue to the next middleware or route handler
};
