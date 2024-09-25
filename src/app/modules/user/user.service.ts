import IUser, { IOrders } from './user.interface';
import User from './user.model';
// import { OrdersValidationSchema } from './user.order.validation';
// import { OrdersValidationSchema } from './user.zod.validation';

const createUserIntoDB = async (userData: IUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error('user already exists');
  }
  const result = await User.create(userData);

  return result;
};
const getAllUsersIntoDB = async () => {
  const result = await User.find().select('-password');
  return result;
};
const getSingleUserIntoDB = async (userId: number) => {
  if (await User.doesUserExists(userId)) {
    throw new Error('user is does not exists');
  }
  const result = await User.findOne({ userId }).select('-password');
  return result;
};
const deleteUserIntoDB = async (userId: number) => {
  if (await User.doesUserExists(userId)) {
    throw new Error('user is does not exists');
  }
  const result = User.findOneAndDelete({ userId });
  return result;
};
const UpdateUserIntoDB = async (
  userId: number,
  user: Partial<IUser>,
): Promise<IUser | null> => {
  if (await User.doesUserExists(userId)) {
    throw new Error('user is does not exists');
  }

  const result = User.findOneAndUpdate(
    { userId },
    { $set: user },
    { new: true, runValidators: true },
  ).select({ password: 0, __v: 0, orders: 0 });

  return result;
};
const addOrdersDataIntoDB = async (
  userId: number,

  ordersData: IOrders,
): Promise<IUser | null> => {
  // Now you are guaranteed that validatedOrder.data exists and is correctly typed

  if (await User.doesUserExists(userId)) {
    throw new Error('user does not exists');
  }
  const result = await User.findOneAndUpdate(
    { userId },
    { $push: { orders: ordersData } },
    { new: true, runValidators: true },
  );
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersIntoDB,
  getSingleUserIntoDB,
  deleteUserIntoDB,
  UpdateUserIntoDB,
  addOrdersDataIntoDB,
};
