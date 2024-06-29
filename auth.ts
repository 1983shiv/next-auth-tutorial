import NextAuth from "next-auth";
import { PrismaAdapter} from "@auth/prisma-adapter"
import { db } from "@lib/db";
import authConfig from "@auth.config";

// export const {
//   auth,
//   handlers: { GET, POST },
// } = NextAuth({ providers: [GitHub, Google, LinkedIn] });

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt"},
  ...authConfig});

