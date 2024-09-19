import IUser from './user.interface';
import User from './user.model';

const createUserIntoDB = async (user: IUser) => {
  const result = await User.create(user);
  return result;
};
const getAllUsersIntoDB = async () => {
  const result = User.find();
  return result;
};
const getSingleUserIntoDB = async (id: number) => {
  const result = User.findById(id);
  return result;
};
const deleteUserIntoDB = async (id: number) => {
  const result = User.findByIdAndDelete(id);
  return result;
};
const UpdateUserIntoDB = async (id: number) => {
  const result = User.findByIdAndUpdate(id);
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersIntoDB,
  getSingleUserIntoDB,
  deleteUserIntoDB,
  UpdateUserIntoDB,
};
