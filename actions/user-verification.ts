'use server';

import { db } from '@lib/db';
import { getUserByEmail } from '@data/user';
import { getVerificationTokenByToken } from '@data/verification-token';

export const userVerification = async (token: string) => {
    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken && token) {
        return {
            success: 'Please try login.',
        };
    }

    if (!existingToken && !token) {
        return { error: 'Missing Token' };
    }

    console.log('expires', new Date(existingToken.expires));
    console.log('current Time', new Date());
    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
        return { error: 'Token has expired' };
    }

    const existingUser = await getUserByEmail(existingToken.email);
    if (!existingUser) {
        return { error: 'Email does not exists' };
    }
    // why to update email, because when user update their email from profile page, and verify the token,
    // their email get updated, so new user as well as existing both can verify their email.
    await db.user.update({
        where: { id: existingUser.id },
        data: {
            emailVerified: new Date(),
            email: existingToken.email,
        },
    });

    await db.verificationToken.delete({
        where: { id: existingToken.id },
    });

    return { success: 'Email verified.' };
};
