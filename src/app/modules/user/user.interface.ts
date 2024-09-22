import { Model } from 'mongoose';
interface IFullName {
  firstName: string;
  lastName: string;
}
interface IAddress {
  street: string;
  city: string;
  country: string;
}
interface IOrders {
  productName: string;
  price: number;
  quantity: number;
}
interface IUser {
  userId: number;
  userName: string;
  password: string;
  fullName: IFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: IAddress;
  orders?: [IOrders];
}
// custom static method

export interface UserModel extends Model<IUser> {
  isUserExists(userId: number): Promise<IUser | null>;
}
export interface UserModel extends Model<IUser> {
  doesUserExists(userId: number): Promise<boolean>;
}

// custom instance methods
// export type IUserMethods = {
//   isUserExists(userId: number): Promise<IUser | null>;
// };

// export type UserModel = Model<IUser>;
export default IUser;
