FROM node:latest-slim

ENV APP_NAME = SETUP_APP_NAME;
ENV APP_PORT = SETUP_PORT;
ENV NODE_ENV = production;

USER node
RUN mkdir -p /home/node/${APP_NAME}
WORKDIR /home/node/${APP_NAME}

COPY package*.json .
COPY dist .

RUN npm install --only=prod
CMD [ "node", "./dist/server/index.js" ]