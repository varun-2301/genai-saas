# Stage 1: install dependencies
FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev

# Stage 2: copy app source
FROM node:22-alpine
WORKDIR /app

# Copy dependencies from previous stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Expose backend port
EXPOSE 5000

# Default command
CMD ["npm", "start"]
