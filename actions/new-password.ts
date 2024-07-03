'use server';

import * as z from 'zod';
import bcrypt from 'bcryptjs';
import { NewPasswordSchema } from '@schemas';
import { getPasswordResetTokenByToken } from '@data/password-reset-token';
import { error } from 'console';
import { getUserByEmail } from '@data/user';
import { db } from '@lib/db';

export const newPassword = async (
    values: z.infer<typeof NewPasswordSchema>,
    token?: string | null
) => {
    if (!token) {
        return { error: 'Missing token' };
    }

    const validatedFields = NewPasswordSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: 'Invalid fields - new-password.ts' };
    }

    const { password } = validatedFields.data;

    const existingToken = await getPasswordResetTokenByToken(token);
    if (!existingToken) {
        return { error: 'Invalid Token! - new-password.ts' };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) {
        return {
            error: 'Password resent token has expired, please re initiate the new password reset request',
        };
    }
    const existingUser = await getUserByEmail(existingToken.email);
    if (!existingUser) {
        return { error: 'Email does not exists.' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
        where: { id: existingUser.id },
        data: { password: hashedPassword },
    });

    await db.passwordResetToken.delete({
        where: { id: existingToken.id },
    });

    return { success: 'Password updated !' };
};
