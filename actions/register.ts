'use server';
import * as z from 'zod';
import { RegisterSchema } from '@schemas';
import bcrypt from 'bcryptjs';
import { db } from '@lib/db';
import { getUserByEmail } from '@data/user';
import { generateRandomId } from '@lib/utils';
import { generateVerificationToken } from '@lib/token';
import { sendVerificationEmail } from '@lib/mail';

export const Register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: 'Invalid Fields' };
    }
    const { email, password, name } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return { error: 'Email already in use.' };
    }

    await db.user.create({
        data: {
            id: generateRandomId(8),
            name,
            email,
            password: hashedPassword,
        },
    });

    const verificationToken = await generateVerificationToken(email);
    // TODO; Send Verification token email

    await sendVerificationEmail(
        verificationToken?.email,
        verificationToken?.token
    );
    return {
        success: 'User Registered Successfully and confirmation email sent',
    };
};
