import mongoose from 'mongoose';
import config from '../config/index.js';

function connectDB(): void {
  mongoose.connect(config.mongodb.connnectionString);

  mongoose.connection.on('error', (error: Error) => {
    console.log('mongodb connection error', error);
  });

  mongoose.connection.on('connected', () => {
    console.log('connected to mongodb');
  });
}

export default connectDB;
