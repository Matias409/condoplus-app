FROM node:18-alpine

WORKDIR /app

# Copy server package files
COPY server/package*.json ./

# Install dependencies
RUN npm install

# Copy server source
COPY server/ ./

# Expose port
EXPOSE 3001

# Start server
CMD ["npm", "start"]
