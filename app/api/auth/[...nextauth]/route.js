import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongoClient";

export const authOptions = {
    adapter: MongoDBAdapter(clientPromise),
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
        }),
        // ...add more providers here
    ],
    session: {
        // Set it as jwt instead of database
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            // Persist the OAuth access_token and or the user id to the token right after signin
            if (user) {
                token.accessToken = user.access_token;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            // Send properties to the client, like an access_token and user id from a provider.
            session.accessToken = token.accessToken;
            session.user.id = token.id;

            return session;
        },
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
