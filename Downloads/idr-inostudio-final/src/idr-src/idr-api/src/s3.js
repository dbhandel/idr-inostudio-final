import AWS  from 'aws-sdk';
import config from './config';

AWS.config.update({
  region: config.s3.region,
  accessKeyId: config.s3.access,
  secretAccessKey: config.s3.secret
});

export default new AWS.S3({
  apiVersion: '2006-03-01',
  params: { Bucket: config.s3.bucket, Delimiter: '/', }
});
