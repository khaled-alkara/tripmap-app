# Stage 1: Build
FROM node:18-alpine AS builder

RUN apk add --no-cache npm

WORKDIR /app

# Copy all (but ignore node_modules via .dockerignore)
COPY . .

# Install deps and build
RUN npm install
RUN npm run build


# Stage 2: Production
FROM node:18-alpine AS production

WORKDIR /app

# Copy only what we need
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./     
COPY --from=builder /app/tsconfig.json ./

# Copy frontend
COPY ../dist/frontend ./public

EXPOSE 3000

CMD ["node", "dist/server.js"]
