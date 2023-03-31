const paypal = require('paypal-rest-sdk');
const config = require('../config');
paypal.configure(config.paypal);

async function executePaypalPayment(paymentId, payerId, total) {
  const execute_payment_json = {
    payer_id: payerId,
  };

  return new Promise((resolve) => {
    paypal.payment.execute(
      paymentId,
      execute_payment_json,
      (error, payment) => {
        if (error) {
          resolve({ payment: null, error });
        } else {
          resolve({ payment, error: null });
        }
      }
    );
  });
}
async function createPaypalPayment(itemList, total) {
  const create_payment_json = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal',
    },
    redirect_urls: {
      return_url: 'http://localhost:8000/api/payment/paymentSuccess',
      cancel_url: 'http://localhost:8000/api/payment/cancel',
    },
    transactions: [
      {
        item_list: {
          items: itemList,
        },
        amount: {
          currency: 'USD',
          total: total.toString(),
        },
        description: 'Hat for the best team ever',
      },
    ],
  };

  return new Promise((resolve, reject) => {
    paypal.payment.create(create_payment_json, (error, payment) => {
      if (error) {
        reject({ status: false, message: 'payment error' });
      } else {
        const approvalUrl = payment.links.find(
          (link) => link.rel === 'approval_url'
        );
        if (!approvalUrl) {
          reject({ status: false, message: 'Approval URL not found' });
        }
        resolve({
          status: true,
          message: 'Create Payment Success!',
          urlRedirect: approvalUrl.href,
        });
      }
    });
  });
}
module.exports = {
  createPaypalPayment,
  executePaypalPayment,
};
