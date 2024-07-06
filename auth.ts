import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@lib/db';
import authConfig from '@auth.config';
import { getUserById } from '@data/user';
import { getTwoFactorConfirmationByUserId } from '@data/two-factor-confirmation';

// export const {
//   auth,
//   handlers: { GET, POST },
// } = NextAuth({ providers: [GitHub, Google, LinkedIn] });

export const { auth, signIn, signOut, handlers } = NextAuth({
    pages: {
        signIn: '/login',
        error: '/error',
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() },
            });
        },
    },
    callbacks: {
        async signIn({ user, account }) {
            console.log(user, account);
            // allow OAuth without email verification
            if (account?.provider !== 'credentials') {
                return true;
            }
            const existingUser = await getUserById(user.id);
            console.log({ existingUser: existingUser });
            // prevent signin without email verification
            if (!existingUser?.emailVerified) {
                return false;
            }

            // Todo : Add 2FA check
            if (existingUser.isTwoFactorEnabled) {
                const twoFactorConfirmation =
                    await getTwoFactorConfirmationByUserId(existingUser.id);

                if (!twoFactorConfirmation) {
                    return false;
                }
                // Delete two factor confirmation for next sign in;
                await db.twoFactorConfirmation.delete({
                    where: { id: twoFactorConfirmation.id },
                });
            }
            return true;
        },
        async session({ token, session }) {
            // console.log({ sessionToken: token, session });
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.role && session.user) {
                //   session.user.role = token.role as "ADMIN" | "USER";
                session.user.role = token.role;
            }

            if (session.user) {
                session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
            }

            return session;
        },
        async jwt({ token }) {
            // console.log('token', { token });
            if (!token.sub) return token;
            const existingUser = await getUserById(token.sub);
            if (!existingUser) return token;
            token.role = existingUser.role;
            token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled
            token.author = 'Hello Shiv';
            return token;
        },
    },
    adapter: PrismaAdapter(db),
    session: { strategy: 'jwt' },
    ...authConfig,
});
