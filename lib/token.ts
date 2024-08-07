import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { db } from './db';
import { getVerificationTokenByEmail } from '@data/verification-token';
import { getPasswordResetTokenByEmail } from '@data/password-reset-token';
import { getTwoFactorTokenByEmail } from '@data/two-factor-token';

export const generateTwoFactorToken = async (email: string) => {
    const token = crypto.randomInt(100_000, 1_000_000).toString();
    const expires = new Date(new Date().getTime() + 3600 * 1000 + 1000);

    const existingToken = await getTwoFactorTokenByEmail(email);
    if (existingToken) {
        await db.twoFactorToken.delete({
            where: { id: existingToken.id },
        });
    }

    const newTwoFactorToken = await db.twoFactorToken.create({
        data: {
            email,
            token,
            expires,
        },
    });

    return newTwoFactorToken;
};

export const generatePasswordResetToken = async (email: string) => {
    try {
        const token = uuidv4();
        const expires = new Date(new Date().getTime() + 3600 * 1000 + 1000);

        const existingToken = await getPasswordResetTokenByEmail(email);

        if (existingToken) {
            await db.passwordResetToken.delete({
                where: { id: existingToken.id },
            });
        }

        const newPasswordResetToken = await db.passwordResetToken.create({
            data: {
                email,
                token,
                expires,
            },
        });

        console.log('new passwordresettoken generated', newPasswordResetToken);
        return newPasswordResetToken;
    } catch (error) {
        console.log('Error from passwordresettoken token.ts', error);
        return null;
    }
};

export const generateVerificationToken = async (email: string) => {
    try {
        const token = uuidv4();
        // verificationtoken will expires in 1 hour
        const expires = new Date(new Date().getTime() + 3600 * 1000 + 1000);

        const existingToken = await getVerificationTokenByEmail(email);

        if (existingToken) {
            await db.verificationToken.delete({
                where: {
                    id: existingToken.id,
                },
            });
        }

        const verificationToken = await db.verificationToken.create({
            data: {
                email,
                token,
                expires,
            },
        });
        console.log('new token generated', verificationToken);
        return verificationToken;
    } catch (error) {
        console.log('Error from token.ts', error);
        return null;
    }
};
