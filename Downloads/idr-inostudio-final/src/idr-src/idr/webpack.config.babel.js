import path from 'path';
import Config, { environment } from 'webpack-config';

function load(file) {
  return new Config().extend(`[root]/${file}.js`).toObject();
}

environment.setAll({
  root: () => path.join(__dirname, 'webpack'),
});

// eslint-disable-next-line import/no-mutable-exports
let toExport;

switch (process.env.BUILD) {
  case 'dev':
    toExport = load('dev');
    break;
  case 'server':
    toExport = load('server');
    break;
  case 'production':
    toExport = load('production');
    break;
  default:
    toExport = [load('production'), load('server')];
}

export default toExport;
