/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { UserServices } from './user.service';
import UserValidationSchema from './user.zod.validation'; // OrdersValidationSchema,
import IUser from './user.interface';
// import { OrdersValidationSchema } from './user.order.validation';
import User from './user.model';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const validatedUser: IUser = UserValidationSchema.parse(user);
    const result = await UserServices.createUserIntoDB(validatedUser);
    res.status(201).json({
      success: 'true',
      message: 'user created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersIntoDB();
    res.status(201).json({
      success: true,
      message: ' users get successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(501).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);

    const result = await UserServices.getSingleUserIntoDB(userId);
    res.status(201).json({
      success: true,
      message: 'single user get successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(501).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};
const updateUser = async (req: Request, res: Response) => {
  try {
    // const userId = Number(req.params.userId);
    const userId = Number(req.params.userId);
    const user = req.body;

    // const result =
    const result = await UserServices.UpdateUserIntoDB(userId, user);
    res.status(201).json({
      success: true,
      message: ' user updated successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(501).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};
const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    await UserServices.deleteUserIntoDB(userId);
    res.status(201).json({
      success: true,
      message: ' user deleted successfully',
      data: null,
    });
  } catch (err: any) {
    res.status(501).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};
const addOrdersData = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const user = await User.isUserExists(userId);

    if (!user) {
      // Throw a custom UserNotFoundError if the user doesn't exist
      throw new Error('User not found');
    }
    const orderData = req.body;

    // const newOrder = {
    //   productName,
    //   price,
    //   quantity,
    // };

    // if (user?.orders) {
    //   user.orders.push(orderData);
    // } else {
    //   user.orders = [orderData];
    // }
    // const ordersValidation = OrdersValidationSchema.safeParse(newOrder);
    // if (!ordersValidation.success) {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'Invalid order data',
    //     errors: ordersValidation.error.errors,
    //   });
    // }

    await UserServices.addOrdersDataIntoDB(userId, orderData);

    res.status(201).json({
      success: true,
      message: ' order added successfully',
      data: null,
    });
  } catch (err: any) {
    res.status(501).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  addOrdersData,
};
