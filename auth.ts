import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import LinkedIn from "next-auth/providers/linkedin"
export const { auth, handlers: {GET, POST} } = NextAuth({ providers: [GitHub, Google, LinkedIn] })