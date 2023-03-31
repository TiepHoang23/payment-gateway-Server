const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  paymentId: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  transactions: [
    {
      item_list: {
        items: [
          {
            name: {
              type: String,
              required: true,
            },
            sku: {
              type: String,
              required: true,
            },
            price: {
              type: Number,
              required: true,
            },
            currency: {
              type: String,
              required: true,
              default: 'USD',
            },
            quantity: {
              type: Number,
              required: true,
            },
          },
        ],
      },
      amount: {
        currency: {
          type: String,
          required: true,
          default: 'USD',
        },
        total: {
          type: Number,
          required: true,
        },
      },
      description: {
        type: String,
        required: true,
      },
    },
  ],
});

const Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;
