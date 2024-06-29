'use server';
import * as z from 'zod';
import { LoginSchema } from '@schemas';
import { signIn } from '@auth';
import { DEFAULT_LOGIN_REDIRECT } from '@routes';
import { AuthError } from 'next-auth';

export const Login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: 'Invalid Fields' };
    }

    const { email, password } = validatedFields.data;
    console.log('email, password: ', email, password);
    try {
        await signIn('credentials', {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { error: 'Invalid Credentials' };
                default:
                    return { error: 'Something went wrong' };
            }
        }
        throw error;
    }
    // return { success: 'Email sent' };
};

export const socialLogin = async (providers: 'google' | 'github') => {
    try {
        await signIn(providers, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT,
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'OAuthSignInError':
                    return { error: 'Invalid OAuthSignInError' };
                default:
                    return { error: 'OAuthSignInError - Something went wrong' };
            }
        }
        throw error;
    }
};
