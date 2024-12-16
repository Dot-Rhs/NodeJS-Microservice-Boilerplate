FROM node:16.0.0-alpine
ENV NODE_ENV development \
    SECRET_KEY sTJQgn5E8d8jMY15PhARwDrW4my6bLwE \

RUN apk add yarn@1.22.10
RUN npm config set unsafe-perm true
RUN npm i -g typescript tsc tslint

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN yarn install

# Bundle app source
COPY . /usr/src/app
RUN yarn build

EXPOSE 8200
CMD NODE_ENV=production yarn start
