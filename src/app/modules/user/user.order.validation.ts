import { z } from 'zod';

// export const OrdersValidationSchema = z.object({
//   orders: z
//     .array(
//       z.object({
//         productName: z.string().optional(),
//         price: z.number().optional(),
//         quantity: z.number().optional(),
//       }),
//     )
//     .optional(),
// });
export const OrdersValidationSchema = z.object({
  orders: z
    .object({
      productName: z.string().optional(),
      price: z.number().optional(),
      quantity: z.number().optional(),
    })

    .optional(),
});
