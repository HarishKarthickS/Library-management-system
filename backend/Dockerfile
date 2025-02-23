# Use an official lightweight Node.js image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire backend source code
COPY . .

# Set environment variables (can be overridden by --env-file in docker run)
ENV PORT=3000

# Expose the application port
EXPOSE 3000

# Run database migrations before starting the server
RUN npx prisma generate

# Command to start the server
CMD ["npm", "start"]
