import { z } from 'zod';

const UserSchema = z.object({
  userId: z.number().nonnegative({ message: 'userId is required' }), // Ensures userId is a non-negative number and required
  userName: z.string().nonempty({ message: 'userName is required' }), // Ensures userName is a non-empty string
  password: z.string().nonempty({ message: 'password is required' }), // Ensures password is a non-empty string
  fullName: z.object({
    firstName: z.string().nonempty({ message: 'firstName is required' }), // Ensures firstName is a non-empty string
    lastName: z.string().nonempty({ message: 'lastName is required' }), // Ensures lastName is a non-empty string
  }),
  age: z.number().min(0, { message: 'age is required' }), // Ensures age is a number and required
  email: z.string().email({ message: 'email is required and must be valid' }), // Ensures a valid email format
  isActive: z.boolean().optional(), // isActive is optional (defaults to true in the Mongoose schema)
  hobbies: z.array(z.string()).nonempty({ message: 'hobbies are required' }), // Ensures hobbies is a non-empty array of strings
  address: z.object({
    street: z.string().nonempty({ message: 'street is required' }), // Ensures street is a non-empty string
    city: z.string().nonempty({ message: 'city is required' }), // Ensures city is a non-empty string
    country: z.string().nonempty({ message: 'country is required' }), // Ensures country is a non-empty string
  }),
  orders: z
    .array(
      z.object({
        productName: z
          .string()
          .nonempty({ message: 'productName is required' }), // Ensures productName is a non-empty string
        price: z.number().min(0, { message: 'price is required' }), // Ensures price is a non-negative number
        quantity: z.number().min(1, { message: 'quantity is required' }), // Ensures quantity is a positive number
      }),
    )
    .optional(), // Orders are optional
  message: z.string().nonempty({ message: 'message is required' }), // Ensures message is a non-empty string
});

// Validate with:
// userSchema.parse(data);
export default UserSchema;
