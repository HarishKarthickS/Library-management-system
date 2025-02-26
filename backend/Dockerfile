# Use official Node.js image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy the backend source code
COPY . .

# Prisma generate (if using Prisma)
RUN npx prisma generate

# Expose port
EXPOSE 3000

# Start backend server
CMD ["npm", "start"]
