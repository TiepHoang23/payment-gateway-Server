import { Request, Response } from 'express';
import { Cart, Payment } from '../database/models/index.js';
import {
  createPaypalPayment,
  executePaypalPayment,
} from '../services/paypalService.js';

async function getMyCart(req: Request, res: Response) {
  try {
    const userId = req.userId;
    const cart = await Cart.findOne({ userId })
      .populate('itemList', 'name sku price currency quantity')
      .lean();
    res.json({ status: true, myCard: cart });
  } catch (error) {
    res.json({ status: false, message: error });
  }
}

async function getHistoryPayment(req: Request, res: Response) {
  try {
    const userId = req.userId;
    if (!userId) {
      res.json({ status: false, message: 'Error Credential' });
    }
    const paymentInfo = await Payment.find({ userId })
      .populate('transactions')
      .lean();
    if (!history) {
      res.json({ status: false, message: 'Cant find history' });
    }
    res.json({ status: true, historyPayment: paymentInfo });
  } catch (error) {
    res.json({ status: false, message: error });
  }
}

async function paymentByPaypal(req: Request, res: Response) {
  try {
    const cart = await Cart.findOne({ userId: req.userId }).populate(
      'itemList',
      'name sku price currency quantity'
    );
    if (!cart) {
      res.json({ status: false, message: 'Cant find cart' });
    }

    const itemList = cart.itemList.map((item) => ({
      name: item.name,
      sku: item.sku,
      price: item.price.toString(),
      currency: item.currency,
      quantity: item.quantity,
    }));

    const paymentResponse = await createPaypalPayment(itemList, cart.total);

    await Payment.create({
      userId: req.userId,
      cartId: cart.id
      paymentId: paymentResponse.paymentId,
      createdAt: Date.now(),
    });
    return res.send(paymentResponse);
  } catch (error) {
    res.json({ status: false, error: error.message });
  }
}

async function getResponsePayment(req: Request, res: Response) {
  try {
    const payerId = req.query.PayerID as string;
    const paymentId = req.query.paymentId as string;

    const { payment, error } = await executePaypalPayment(paymentId, payerId);

    if (error) {
      console.log(error);

      return res.send({ status: false, message: 'payment error' });
    }

    const { transactions } = payment;

    const paymentInfo = await Payment.findOneAndUpdate(
      {
        paymentId,
      },
      {
        transactions: transactions,

        status: 'Success',
      }
    );
    // res.json({ status: true, paymentInfo });
    res.redirect(
      `http://localhost:8000/api/payment/success/?idCard=${paymentInfo.cartId}`
    );
    // res.json('payment-success', { paymentId, transactions });
  } catch (error) {
    res.json({ status: false, error: error.message });
  }
}

function handlePaymentCancel(req: Request, res: Response) {
  res.send({ status: false, message: 'Payment cancelled!' });
}
async function handlePaymentSuccess(req: Request, res: Response) {
  const cartId = req.query?.idCard;

  const lastPayment = await Payment.findOne({
    cartId,
  }).lean();

  res.render('payment', { lastPayment });
 
}
export default {
  getMyCart,
  paymentByPaypal,
  getResponsePayment,
  getHistoryPayment,
  handlePaymentCancel,
  handlePaymentSuccess,
};
