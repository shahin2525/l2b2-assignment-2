import { z } from 'zod';

// Zod validation schema for User
const UserValidationSchema = z.object({
  userId: z.number().nonnegative({ message: 'userId is required' }),
  userName: z.string().nonempty({ message: 'userName is required' }),
  password: z.string().nonempty({ message: 'password is required' }),
  fullName: z.object({
    firstName: z.string().nonempty({ message: 'firstName is required' }),
    lastName: z.string().nonempty({ message: 'lastName is required' }),
  }),
  age: z.number().min(0, { message: 'age is required' }),
  email: z.string().email({ message: 'email is required and must be valid' }),
  isActive: z.boolean(),
  hobbies: z.array(z.string()).nonempty({ message: 'hobbies are required' }),
  address: z.object({
    street: z.string().nonempty({ message: 'street is required' }),
    city: z.string().nonempty({ message: 'city is required' }),
    country: z.string().nonempty({ message: 'country is required' }),
  }),
  orders: z.array(z.object({})).optional(),
  //     z.object({
  //       productName: z.string().optional(),
  //       price: z.number().optional(),
  //       quantity: z.number().optional(),
  //     }),
  //   )
  //   .optional(),
});

export default UserValidationSchema;
