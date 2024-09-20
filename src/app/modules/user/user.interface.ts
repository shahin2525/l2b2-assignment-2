import { Model } from 'mongoose';

interface IUser {
  userId: number;
  userName: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: {
    street: string;
    city: string;
    country: string;
  };
  orders?: [{ productName: string; price: number; quantity: number }];
}

export type IUserMethods = {
  isUserExists(userId: number): Promise<IUser | null>;
};

export type UserModel = Model<IUser, Record<string, never>, IUserMethods>;
export default IUser;
