FROM node:18

WORKDIR /usr/src/app

# Copy package files
COPY server/package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy all server files
COPY server/src ./src

# Expose port
EXPOSE 3001

# Start
CMD [ "node", "src/index.js" ]
