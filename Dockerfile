FROM node:18.18.1-alpine

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . .

EXPOSE 8090

VOLUME /app/node_modules

CMD ["npm", "run", "start:dev"]
