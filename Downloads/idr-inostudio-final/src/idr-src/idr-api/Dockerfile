FROM node:7.4.0

# fix https://github.com/npm/npm/issues/9863
RUN cd $(npm root -g)/npm \
 && npm install fs-extra \
 && sed -i -e s/graceful-fs/fs-extra/ -e s/fs\.rename/fs.move/ ./lib/utils/rename.js

# install globals
RUN npm i -g mocha knex nodemon yarn

# locals
WORKDIR /app

COPY package.json .
RUN yarn --pure-lockfile

# copy Javascript source files
COPY . .

# run
EXPOSE 5000
CMD npm run server
