import { Application } from 'express';
import authRouter from './auth.js';
import paymentRouter from './payment.js';
import auth from '../middleware/auth.js';

function attachRouter(app: Application) {
  app.use(auth.parserToken);
  app.use('/api/auth', authRouter);
  app.use('/api/payment', paymentRouter);
}

export { attachRouter };
