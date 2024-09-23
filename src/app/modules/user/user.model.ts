import { model, Schema } from 'mongoose';
import IUser, { UserModel } from './user.interface';

const fullNameSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'firstName is required'], // Custom error message
  },
  lastName: {
    type: String,
    required: [true, 'lastName is required'], // Custom error message
  },
});
const addressSchema = new Schema({
  street: {
    type: String,
    required: [true, 'street is required'], // Custom error message
  },
  city: {
    type: String,
    required: [true, 'city is required'], // Custom error message
  },
  country: {
    type: String,
    required: [true, 'country is required'], // Custom error message
  },
});
const orderSchema = new Schema({
  productName: {
    type: String,
    required: false, // Make productName optional
  },
  price: {
    type: Number,
    required: false, // Make price optional
  },
  quantity: {
    type: Number,
    required: false, // Make quantity optional
  },
});

const userSchema = new Schema<IUser, UserModel>({
  userId: {
    type: Number,
    required: [true, 'userId is required'], // Custom error message
    unique: true, // Ensures userId is unique
  },
  userName: {
    type: String,
    required: [true, 'userName is required'], // Custom error message
    unique: true, // Ensures userName is unique
  },
  password: {
    type: String,
    required: [true, 'password is required'], // Custom error message
  },
  fullName: {
    type: fullNameSchema,
  },
  age: {
    type: Number,
    required: [true, 'age is required'], // Custom error message
  },
  email: {
    type: String,
    required: [true, 'email is required'], // Custom error message
    unique: true, // Ensures email is unique
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  hobbies: {
    type: [String], // Array of strings
    required: [true, 'hobbies are required'], // Custom error message
  },
  address: {
    type: addressSchema,
  },
  orders: {
    type: [orderSchema],
  },
});

userSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await User.findOne({ userId });

  return existingUser;
};
userSchema.statics.doesUserExists = async function (userId: number) {
  const existingUser = await User.findOne({ userId });

  return !existingUser;
};

const User = model<IUser, UserModel>('User', userSchema);
export default User;
