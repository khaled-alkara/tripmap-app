# Use Node 18 Alpine
FROM node:18-alpine AS builder

# Install npm explicitly (Alpine fix)
RUN apk add --no-cache npm

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy TypeScript config and source
COPY tsconfig.json ./
COPY src/ ./src/

# Build TypeScript
RUN npm run build


# --------------------------------------------------
# Stage 2: Production Runtime
FROM node:18-alpine AS production

WORKDIR /app

# Copy built files and node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Copy built frontend (build it locally first)
# Assuming you built Angular into ../dist/frontend
COPY ../dist/frontend ./public


# Expose port
EXPOSE 3000

# Start the server
CMD ["node", "dist/server.js"]
