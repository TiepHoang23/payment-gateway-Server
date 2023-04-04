import mongoose, { Schema } from 'mongoose';

// Define the data schema


const cartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  itemList: [
    {
      type:Schema.Types.ObjectId,
      ref:'Item'
  }
  ],
  total: {
    type: Number,
    required: true,
  },
});

const Cart = mongoose.model('cart', cartSchema);
export default Cart;
