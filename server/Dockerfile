FROM node:16
WORKDIR /app

ARG PORT

COPY package.json yarn.lock ./

RUN export NODE_ENV=production
RUN yarn

COPY . .
RUN yarn build

EXPOSE $PORT
CMD ["yarn", "start"]
