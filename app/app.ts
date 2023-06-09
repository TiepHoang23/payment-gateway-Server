import express, { Express, Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { createServer, Server } from 'http';
import cors from 'cors';
import { attachRouter } from './routes/index.js';
import { connectDB } from './database/index.js';

connectDB();
const app: Express = express();

// EJS setup

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
console.log(12);

const httpServer: Server = createServer(app);

// app.use(express.static(path.join(__dirname, 'public')));
attachRouter(app);

app.use((_req: Request, res: Response, next: NextFunction) => {
  res.status(404).send('404 not found');
  next();
});
console.log(4);

export default httpServer;
