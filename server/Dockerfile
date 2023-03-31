FROM node:current-alpine

WORKDIR /server

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 8000

CMD ["node", "app.js"]