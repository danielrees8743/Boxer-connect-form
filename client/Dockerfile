FROM node:current-alpine

WORKDIR /src

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 5173

CMD ["node", "dev"]