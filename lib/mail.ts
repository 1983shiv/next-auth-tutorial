import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendTwoFactorEmail = async (email: string, token: string) => {
    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: '2FA Code',
        html: `<p>Your 2FA Code for Authentication : ${token}</p>`,
    });
};

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `http://localhost:3000/new-verification?token=${token}`;
    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Confirm Your email',
        html: `<p>Please click <a href="${confirmLink}">here</a> to confirm your email."</p>`,
    });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const confirmLink = `http://localhost:3000/new-password?token=${token}`;
    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Password Reset',
        html: `<p>Please click <a href="${confirmLink}">here</a> to update your email."</p>`,
    });
};
