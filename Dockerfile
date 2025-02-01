# Stage 1: Build frontend
FROM node:18-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend . .
RUN npm run build

# Stage 2: Build backend
FROM node:16-alpine AS backend-build
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend . .

# Stage 3: Setup frontend with nginx
FROM nginx:alpine AS frontend
COPY --from=frontend-build /app/frontend/dist /usr/share/nginx/html
EXPOSE 80

# Stage 4: Setup backend with node
FROM node:16-alpine AS backend
WORKDIR /usr/src/app
COPY --from=backend-build /app/backend /usr/src/app

# Install Nginx (required for the frontend)
RUN apk add --no-cache nginx

# Expose backend and frontend ports
EXPOSE 80
EXPOSE 5000

# Final Stage - Specify default command to run both services
CMD sh -c "node /usr/src/app/server.js & nginx -g 'daemon off;'"
