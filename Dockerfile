# 前端
FROM node:14 as frontend
WORKDIR /app/frontend
COPY tetris-game/package*.json ./
RUN npm install
COPY tetris-game .
RUN npm run build

# 後端
FROM node:14
WORKDIR /app/backend
COPY tetris-backend/package*.json ./
RUN npm install
COPY tetris-backend .
COPY --from=frontend /app/frontend/dist /app/backend/public

EXPOSE 3000
CMD ["node", "server.js"]