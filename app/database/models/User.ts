import mongoose, { Schema, Model, Document } from 'mongoose';

export interface User extends Document {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  role: string;
}

const userSchema: Schema<User> = new Schema({
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

const UserModel: Model<User> = mongoose.model < User > ('User', userSchema);

export default UserModel;
