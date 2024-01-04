import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    secret:process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
        }),
        // ...add more providers here
    ],
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
