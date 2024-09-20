import IUser from './user.interface';
import User from './user.model';

const createUserIntoDB = async (userData: IUser) => {
  // const result = await User.create(user);
  const user = new User(userData);
  if (await user.isUserExists(userData.userId)) {
    throw new Error('user is already exists');
  }
  const result = await user.save();
  return result;
};
const getAllUsersIntoDB = async () => {
  const result = User.find().select('-password');
  return result;
};
const getSingleUserIntoDB = async (userId: number) => {
  const result = User.findOne({ userId }).select('-password');
  return result;
};
const deleteUserIntoDB = async (id: string) => {
  const result = User.findByIdAndDelete(id);
  return result;
};
const UpdateUserIntoDB = async (id: string) => {
  const result = User.findByIdAndUpdate(id).select('-password');
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersIntoDB,
  getSingleUserIntoDB,
  deleteUserIntoDB,
  UpdateUserIntoDB,
};
