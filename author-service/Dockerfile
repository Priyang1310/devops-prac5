FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install express
COPY . .
CMD ["node", "index.js"]
