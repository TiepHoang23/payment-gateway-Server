import express from 'express';
import { paymentController } from '../controllers/index.js';
import auth from '../middleware/auth.js'; // import AuthenticatedRequest from auth module
// import AuthenticatedRequest from auth module

const paymentRouter = express.Router();

paymentRouter.get('/myCart', auth.checkAuth, paymentController.getMyCart);
paymentRouter.get('/success', paymentController.handlePaymentSuccess);
paymentRouter.post(
  '/paymentCart',
  auth.checkAuth,
  paymentController.paymentByPaypal
);
paymentRouter.get('/paymentSuccess', paymentController.getResponsePayment);
paymentRouter.get('/paymentHistory', paymentController.getHistoryPayment);
paymentRouter.get('/cancel', paymentController.handlePaymentCancel);

export default paymentRouter;
