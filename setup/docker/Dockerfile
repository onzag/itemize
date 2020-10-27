## FIRST STEP TO PREPARE NPM INSTALL

FROM node:alpine

USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

ARG NPM_TOKEN
# needed by the builder as it checks the configuration
COPY config config
COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
COPY src src
COPY schema schema
COPY resources resources
COPY webpack.config.js webpack.config.js
COPY itemize.config.js itemize.config.js
COPY babel.config.json babel.config.json
COPY .npmrc-docker .npmrc

USER root
RUN apk --no-cache add --virtual builds-deps build-base python
USER node
RUN npm install --unsafe-perms
RUN npm run build
RUN rm -f .npmrc

## SECOND STEP TO ACTUALLY COPY THE FILES REQUIRED BY THE SERVER

FROM node:alpine

ENV NODE_ENV development
# ENV NODE_ENV production

ENV PORT 8000
ENV INSTANCE_GROUP_ID DOCKER_UNIDENTIFIED_INSTANCE
ENV INSTANCE_MODE ABSOLUTE
# ENV INSTANCE_MODE EXTENDED

ENV USING_DOCKER true

USER root
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY --from=0 /home/node/app/node_modules node_modules
COPY --from=0 /home/node/app/dist dist
COPY package.json .
COPY tsconfig.json .
COPY itemize.config.js .

CMD [ "node", "-r", "tsconfig-paths/register", "./dist/server/index.js" ]