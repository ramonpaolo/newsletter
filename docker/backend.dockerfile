FROM node:14.7-alpine

LABEL maintainer "Ramon Paolo Maran"

WORKDIR /app

EXPOSE 3000

COPY / ./

RUN yarn && yarn build

CMD [ "yarn", "start" ]