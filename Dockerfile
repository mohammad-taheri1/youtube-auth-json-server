FROM node:19-alpine

COPY . /app/

WORKDIR /app

RUN npm install

CMD ["node", "index.js"]