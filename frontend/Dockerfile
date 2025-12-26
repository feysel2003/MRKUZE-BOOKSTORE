FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Vite default port
EXPOSE 5173

# We use "host" to make it accessible from outside the container
CMD ["npm", "run", "dev", "--", "--host"]