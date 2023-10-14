FROM node:18.15.0

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY next.config.js ./

COPY drizzle ./
COPY public ./
COPY src ./

CMD [ "yarn", "dev" ]

