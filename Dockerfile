# Stage 1: Build
FROM node:18-alpine AS builder

# Install npm (Alpine fix)
RUN apk add --no-cache npm

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm install

# Copy source
COPY tsconfig.json ./
COPY src/ ./src/

# Build TypeScript
RUN npm run build


# --------------------------------------------------
# Stage 2: Production
FROM node:18-alpine AS production

WORKDIR /app

# Copy built files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./


# Copy frontend
COPY ../dist/frontend ./public

EXPOSE 3000

CMD ["node", "dist/server.js"]
