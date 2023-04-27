FROM node:18.3.0-alpine3.14

# Path: /app
WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "start"]
