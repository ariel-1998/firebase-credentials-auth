import { z } from "zod";

// export type UserModel = {
//   email: string;
//   password: string;
// };

export const registrationSchema = z
  .object({
    email: z.string().email("Must be a valid Email."),
    password: z.string().min(8, "Password must contain 8 chars."),
    passwordConfirm: z.string(),
  })
  .refine(
    (args) => {
      return args.password === args.passwordConfirm;
    },
    { path: ["passwordConfirm"], message: "Passwords don't match." }
  );

export type TypeRegistraionData = z.infer<typeof registrationSchema>;
