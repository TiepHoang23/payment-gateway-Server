const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  paymentId: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
  transactions: [
    {
      item_list: {
        items: [
          {
            name: {
              type: String,
            },
            sku: {
              type: String,
            },
            price: {
              type: Number,
            },
            currency: {
              type: String,
              default: 'USD',
            },
            quantity: {
              type: Number,
            },
          },
        ],
      },
      amount: {
        currency: {
          type: String,
          default: 'USD',
        },
        total: {
          type: Number,
        },
      },
      description: {
        type: String,
      },
    },
  ],
  status: {
    type: String,
    enum: ['Pending', 'Success'],
    default: 'Pending',
  },
});

const Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;
