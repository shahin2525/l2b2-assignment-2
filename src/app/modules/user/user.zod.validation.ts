// import { z } from 'zod';
// const fullNameSchema = z.object({
//   firstName: z.string().nonempty({ message: 'firstName is required' }), // Ensures firstName is a non-empty string
//   lastName: z.string().nonempty({ message: 'lastName is required' }), // Ensures lastName is a non-empty string
// });
// const orderSchema = z.object({
//   productName: z.string().min(1, 'Product name cannot be empty').optional(), // Product name must have at least 1 character
//   price: z.number().positive('Price must be greater than 0').optional(), // Price must be positive
//   quantity: z
//     .number()
//     .int()
//     .positive('Quantity must be a positive integer')
//     .optional(), // Quantity must be a positive integer
// });
// const addressSchema = z.object({
//   street: z.string().nonempty({ message: 'street is required' }), // Ensures street is a non-empty string
//   city: z.string().nonempty({ message: 'city is required' }), // Ensures city is a non-empty string
//   country: z.string().nonempty({ message: 'country is required' }), // Ensures country is a non-empty string
// });
// const UserValidationSchema = z.object({
//   userId: z.number().nonnegative({ message: 'userId is required' }), // Ensures userId is a non-negative number and required
//   userName: z.string().nonempty({ message: 'userName is required' }), // Ensures userName is a non-empty string
//   password: z.string().nonempty({ message: 'password is required' }), // Ensures password is a non-empty string
//   fullName: fullNameSchema,
//   age: z.number().min(0, { message: 'age is required' }), // Ensures age is a number and required
//   email: z.string().email({ message: 'email is required and must be valid' }), // Ensures a valid email format
//   isActive: z.boolean(),
//   hobbies: z.array(z.string()).nonempty({ message: 'hobbies are required' }), // Ensures hobbies is a non-empty array of strings
//   address: addressSchema,
//   orders: orderSchema.optional(),
// });

// // Validate with:
// // userSchema.parse(data);
// export default UserValidationSchema;

//

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
  orders: z
    .array(
      z.object({
        productName: z.string().optional(),
        price: z.number().optional(),
        quantity: z.number().optional(),
      }),
    )
    .optional(),
});

export default UserValidationSchema;
