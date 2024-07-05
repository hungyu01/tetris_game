# 前端
FROM node:20 AS frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend .
RUN npm run build

# 後端
FROM node:20
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend .
COPY --from=frontend /app/frontend/dist /app/backend/public

EXPOSE 3000
CMD ["node", "server.js"]