const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
  firstName: String,
  lastName: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  role: {
    type: String,
    enum: ['User', 'Customer'],
    required: true,
    default: 'User',
  },
});
userSchema.index({ username: 'text' });

const User = mongoose.model('user', userSchema);
module.exports = User;
