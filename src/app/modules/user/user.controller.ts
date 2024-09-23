/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { UserServices } from './user.service';
import UserValidationSchema from './user.zod.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const validatedUser = UserValidationSchema.parse(user);
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
    const userId = Number(req.params.userId);
    console.log(userId);
    // const result =
    await UserServices.UpdateUserIntoDB(userId);
    res.status(201).json({
      success: true,
      message: ' user updated successfully',
      data: userId,
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

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
