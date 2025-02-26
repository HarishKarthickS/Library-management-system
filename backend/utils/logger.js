const { createLogger, format, transports } = require('winston');
const { LoggingWinston } = require('@google-cloud/logging-winston');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Ensure logs directory exists for local logging
const logDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Use environment variable or default log file
const logFilePath = process.env.LOG_FILE_PATH || path.join(logDir, 'backend.log');

// Google Cloud Logging Transport (Only use in production)
const cloudLoggingTransport =
  process.env.NODE_ENV === 'production' ? new LoggingWinston() : null;

// Define custom log format
const customFormat = format.printf(({ level, message, timestamp }) => {
  return `[${timestamp}] [${level.toUpperCase()}] - ${message}`;
});

// Create Winston logger
const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info', // Default level is "info"
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    customFormat
  ),
  transports: [
    // Console Transport (for debugging)
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        customFormat
      ),
    }),
    
    // File Transport (for local development)
    new transports.File({
      filename: logFilePath,
      level: 'info',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        customFormat
      ),
    }),

    // Google Cloud Logging (Only in production)
    ...(cloudLoggingTransport ? [cloudLoggingTransport] : []),
  ],
});

// Helper function to log messages with function name
const log = (level, message, functionName = 'N/A') => {
  logger.log({ level, message, functionName });
};

module.exports = { logger, log };
