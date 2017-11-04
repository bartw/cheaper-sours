FROM node:8-slim

ENV base_url="https://bartwijnants.be"

RUN apt-get update && apt-get install -y wget --no-install-recommends \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-unstable \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get purge --auto-remove -y curl \
    && rm -rf /src/*.deb

WORKDIR /home/node/app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY .babelrc .
COPY webpack.config.js .
COPY client ./client
COPY server ./server
COPY public ./public

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]