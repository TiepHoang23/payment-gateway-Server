import paypal, { Payment } from 'paypal-rest-sdk';
import config from '../config/index.js';

paypal.configure(config.paypal);

async function executePaypalPayment(
  paymentId: string,
  payerId: string,
): Promise<{ payment: Payment | null; error: any }> {
  const execute_payment_json = {
    payer_id: payerId,
  };

  return new Promise((resolve) => {
    paypal.payment.execute(
      paymentId,
      execute_payment_json,
      (error: any, payment: Payment) => {
        if (error) {
          resolve({ payment: null, error });
        } else {
          resolve({ payment, error: null });
        }
      }
    );
  });
}

interface Item {
  name: string;
  sku: string;
  price: string;
  currency: string;
  quantity: number;
}

interface CreatePaypalPaymentResponse {
  status: boolean;
  message: string;
  paymentId?: string;
  urlRedirect?: string;
}

async function createPaypalPayment(
  itemList: Item[],
  total: number
): Promise<CreatePaypalPaymentResponse> {
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

  return new Promise<CreatePaypalPaymentResponse>((resolve, reject) => {
    
    paypal.payment.create(create_payment_json, (error: any, payment: Payment) => {
      if (error) {
        reject({ status: false, message: 'payment error' });
      } else {
        const approvalUrl = payment.links?.find(
          (link) => link.rel === 'approval_url'
        );
        if (!approvalUrl) {
          reject({ status: false, message: 'Approval URL not found' });
        }
        resolve({
          status: true,
          message: 'Create Payment Success!',
          paymentId: payment.id,
          urlRedirect: approvalUrl?.href,
        });
      }
    });
  });
}

export default { createPaypalPayment, executePaypalPayment };
export  { createPaypalPayment, executePaypalPayment };
