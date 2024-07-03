'use server';
import * as z from 'zod';
import { LoginSchema } from '@schemas';
import { signIn } from '@auth';
import { DEFAULT_LOGIN_REDIRECT } from '@routes';
import { AuthError } from 'next-auth';
import { generateVerificationToken } from '@lib/token';
import { getUserByEmail } from '@data/user';
import { sendVerificationEmail } from '@lib/mail';
import { generateTwoFactorToken } from '@lib/token';
import { sendTwoFactorEmail } from '@lib/mail';
import { getTwoFactorTokenByEmail } from '@data/two-factor-token';
import { db } from '@lib/db';
import { getTwoFactorConfirmationByUserId } from '@data/two-factor-confirmation';

export const Login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: 'Invalid Fields' };
    }

    const { email, password, code } = validatedFields.data;
    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: 'Email does not exists' };
    }

    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(
            existingUser.email
        );

        await sendVerificationEmail(
            verificationToken?.email,
            verificationToken?.token
        );
        // console.log("generateVerificationToken", verificationToken)
        return { success: 'Confirmation Email sent.' };
    }

    if (existingUser.isTwoFactorEnabled && existingUser.email) {
        if (code) {
            const twoFAToken = await getTwoFactorTokenByEmail(
                existingUser.email
            );

            if (!twoFAToken) {
                return { error: 'Invalid 2FA Code' };
            }

            if (twoFAToken.token !== code) {
                return { error: 'Invalid 2FA Code' };
            }

            const hasExpired = new Date(twoFAToken.expires) < new Date();
            if (hasExpired) {
                return {
                    error: 'Code has expired, please request 2FA code again.',
                };
            }

            await db.twoFactorToken.delete({
                where: { id: twoFAToken.id },
            });

            const existingConf = await getTwoFactorConfirmationByUserId(
                existingUser.id
            );

            if (existingConf) {
                await db.twoFactorConfirmation.delete({
                    where: { id: existingConf.id },
                });
            }
            await db.twoFactorConfirmation.create({
                data: {
                    userId: existingUser.id,
                },
            });
        } else {
            const twoFactorToken = await generateTwoFactorToken(
                existingUser.email
            );
            await sendTwoFactorEmail(
                twoFactorToken.email,
                twoFactorToken.token
            );
            return { twoFactor: true };
        }
    }

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
