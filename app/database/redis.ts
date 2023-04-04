import { createClient } from 'redis';
// import mongoose from 'mongoose';
// import config from '../config';


const redis_client = createClient({
  password: '5MxU1xRHrTfN8sP0E2JC0ezci3yO8k2U',
  socket: {
    host: 'redis-13980.c295.ap-southeast-1-1.ec2.cloud.redislabs.com',
    port: 13980,
  },
});

redis_client.connect();

redis_client.on('ready', () => {
  console.log('connected to redis');
});

redis_client.on('error', (error: Error) => {
  console.log('redis error', error);
  process.exit(1);
});

export default redis_client;
