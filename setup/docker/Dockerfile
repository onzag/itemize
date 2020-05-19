## FIRST STEP TO PREPARE NPM INSTALL

FROM node:alpine

USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

ARG NPM_TOKEN
COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
COPY src src
COPY .npmrc-docker .npmrc

USER root
RUN apk --no-cache add --virtual builds-deps build-base python
USER node
RUN npm install --only=prod --unsafe-perms
RUN rm -f .npmrc

## SECOND STEP TO ACTUALLY COPY THE FILES REQUIRED BY THE SERVER

FROM node:alpine

ENV NODE_ENV development
# ENV NODE_ENV staging
# ENV NODE_ENV production

ENV PORT 8000
ENV INSTANCE_GROUP_ID DOCKER_UNIDENTIFIED_INSTANCE
ENV INSTANCE_MODE MANAGER
# ENV INSTANCE_MODE EXTENDED

ENV USING_DOCKER true

USER root
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY --from=0 /home/node/app/node_modules node_modules
COPY --from=0 /home/node/app/dist dist
COPY dist/data dist/data
COPY dist/buildnumber dist/
COPY package.json .

CMD [ "node", "./dist/server/index.js" ]