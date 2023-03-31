const { Cart, Payment } = require('../database/models');
const {
  createPaypalPayment,
  executePaypalPayment,
} = require('../services/paypalService');

async function getMyCart(req, res) {
  try {
    const userId = req.userId;
    const cart = await Cart.findOne({ userId }).lean();
    if (!cart) {
      res.json({ status: false, message: 'Cant find cart' });
    }
    res.json({ status: true, myCard: cart });
  } catch (error) {
    res.json({ status: false, message: error });
  }
}
async function getMyHistoryPayment(req, res) {
  try {
    const userId = req.userId;
    const cart = await Payment.find({ userId }).lean();
    if (!cart) {
      res.json({ status: false, message: 'Cant find cart' });
    }
    res.json({ status: true, myCard: cart });
  } catch (error) {
    res.json({ status: false, message: error });
  }
}
async function paymentByPaypal(req, res) {
  try {
    const cart = await Cart.findOne({ userId: req.userId }).lean();
    // const cart = await Cart.findOne({ username: 'johndoe' }).lean();

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
    return res.send(paymentResponse);
  } catch (error) {
    res.json({ status: false, error: error.message });
  }
}

async function getResponsePayment(req, res) {
  try {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const { payment, error } = await executePaypalPayment(paymentId, payerId);

    if (error) {
      return res.send({ status: false, message: 'payment error' });
    }

    const { id, create_time, transactions } = payment;
    const historyPayment = await Payment.create({
      paymentId: id,
      createdAt: create_time,
      transactions: transactions,
    });
    res.render('payment-success', { paymentId, transactions });
  } catch (error) {
    res.json({ status: false, error: error.message });
  }
}

module.exports = {
  getMyCart,
  paymentByPaypal,
  getResponsePayment,
  getMyHistoryPayment,
};
