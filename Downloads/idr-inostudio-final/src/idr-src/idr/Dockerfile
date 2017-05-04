FROM node:7.4.0-alpine

ENV PACKAGES git python g++ make
WORKDIR /www

# install npm packages
COPY package.json .
RUN apk add --update $PACKAGES \
  && rm -rf /var/cache/apk/* \
  && npm i \
  && apk del $PACKAGES

# copy source Javascript
COPY . .

# license keys
ENV FROALA_KEY mocgB-11ohmabA8dtqF-10==

# build and bundle
RUN npm run build
RUN npm run build-storybook

EXPOSE 4000 8000
CMD npm start
