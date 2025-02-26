# Use an official Node.js image as the base image
FROM node:18-alpine AS builder

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire frontend source code
COPY . .

# Build the production-ready frontend assets
RUN npm run build

# ---- Serve the App ----
FROM nginx:alpine

# Set working directory in Nginx container
WORKDIR /usr/share/nginx/html

# Remove default Nginx static files
RUN rm -rf ./*

# Copy built React app from the builder stage
COPY --from=builder /app/dist .

# Copy Nginx configuration (for SPA support)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# ✅ Ensure Cloud Run's required port 8080 is exposed
EXPOSE 8080

# ✅ Set the required PORT environment variable
ENV PORT=8080

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]