import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@lib/db';
import authConfig from '@auth.config';
import { getUserById } from '@data/user';

// export const {
//   auth,
//   handlers: { GET, POST },
// } = NextAuth({ providers: [GitHub, Google, LinkedIn] });

export const {
    auth,
    signIn,
    signOut,
    handlers,
} = NextAuth({
    events: {
        async linkAccount({ user }){
            await db.user.update({
                where: { id: user.id},
                data: { emailVerified: new Date()}
            })
        }
    },
    callbacks: {
        async signIn({ user }){
            const existingUser = await getUserById(user.id)
            // if (!existingUser || !existingUser.emailVerified){
            //     return false;
            // }
            return true;
        },
        async session({ token, session }) {
            console.log({ sessionToken: token, session });
            if(token.sub && session.user){
              session.user.id = token.sub;
            }

            if(token.role && session.user){
            //   session.user.role = token.role as "ADMIN" | "USER";
            session.user.role = token.role
            }
            return session;
        }, 
        async jwt({ token }) {
            console.log('token', { token });
            if(!token.sub) return token;
            const existingUser = await getUserById(token.sub)
            if(!existingUser) return token ;
            token.role = existingUser.role;
            token.author = "Hello Shiv";
            return token;
        },
    },
    adapter: PrismaAdapter(db),
    session: { strategy: 'jwt' },
    ...authConfig,
});
