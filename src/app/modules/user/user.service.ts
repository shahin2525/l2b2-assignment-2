import IUser from './user.interface';
import User from './user.model';

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
  const result = User.findByIdAndDelete(userId);
  return result;
};
const UpdateUserIntoDB = async (userId: number) => {
  if (await User.doesUserExists(userId)) {
    throw new Error('user is does not exists');
  }
  const result = User.findByIdAndUpdate(userId).select('-password');
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersIntoDB,
  getSingleUserIntoDB,
  deleteUserIntoDB,
  UpdateUserIntoDB,
};
