require('babel-register');

// exit from Node when Docker terminates
process.on('SIGTERM', function () {
  process.exit(1);
});

// check valid environment
if (['development', 'staging', 'production'].indexOf(process.env.NODE_ENV) === -1) {
  console.log('invalid NODE_ENV');
  process.exit(1);
}

// Register required environment vars
require('./src/env')('PORT');

require('./src/server').default(process.env.PORT).then(function () {
  console.log(`Listening on port ${process.env.PORT}`);
});
