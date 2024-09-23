import IUser from './user.interface';
import User from './user.model';
import { OrdersValidationSchema } from './user.zod.validation';

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ordersData: any,
): Promise<IUser | null> => {
  // const validatedOrder = OrdersValidationSchema.safeParse({
  //   orders: [ordersData],
  // });
  // if (!validatedOrder.success) {
  //   throw new Error('data not validated');
  // }

  const validatedOrder = OrdersValidationSchema.parse({
    orders: [ordersData],
  });

  // Check if validation was successful
  // if (!validatedOrder.success) {
  //   // Throw an error or handle the validation failure
  //   throw new Error(
  //     'Invalid order data: ' + JSON.stringify(validatedOrder.error.issues),
  //   );
  // }

  // Now you are guaranteed that validatedOrder.data exists and is correctly typed
  const validatedOrderData = validatedOrder;
  if (await User.doesUserExists(userId)) {
    throw new Error('user does not exists');
  }
  const result = await User.findOneAndUpdate(
    { userId },
    { $addToSet: { orders: validatedOrderData } },
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
