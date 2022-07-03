import { object, string, TypeOf } from 'zod'

export const createUserSchema = object({
    body: object({
        firstName: string({
            required_error: "FirstName is Required.",
        }),
        lastName: string({
            required_error: "FirstName is Required.",
        }),
        password: string({
            required_error: "Password is Required.",
        }).min(6, "Password is too short, it should be minimum 6 characters."),
        passwordConfirmation: string({
            required_error: "Password Confirmation is Required."
        }),
        email: string({
            required_error: "Email is Required."
        }).email("Not a Valid Email.")
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "Password do not match.",
        path: ["passwordConfirmation"],
    })
})

export type CreateUserInput = TypeOf<typeof createUserSchema>["body"];