FROM node:8-slim

ENV base_url="https://bartwijnants.be"

WORKDIR /home/node/app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY .babelrc .
COPY webpack.config.js .
COPY client ./client
COPY server ./server
COPY public ./public

EXPOSE 3000

CMD ["yarn", "start"]