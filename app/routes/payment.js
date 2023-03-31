const express = require('express');
const { paymentController } = require('../controllers');
const auth = require('../middleware/auth');
const paymentRouter = express.Router();

paymentRouter.get('/myCart', auth.checkAuth, paymentController.getMyCart);
paymentRouter.post(
  '/paymentCart',
  auth.checkAuth,
  paymentController.paymentByPaypal
);
paymentRouter.get('/paymentSuccess', paymentController.getResponsePayment);
module.exports = paymentRouter;
