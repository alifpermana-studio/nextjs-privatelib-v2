import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
/* import { MongoDBAdapter } from "@auth/mongodb-adapter"; */
import User from "@/models/User";
/* import clientPromise from "@/lib/mongoClient"; */
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

/* const refreshTokenApiCall = async (token) => {
  const url = process.env.NEXT_PUBLIC_API_URL + "/auth/refresh";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "refresh-token": token.refreshToken,
    },
  });
  if (res.ok) {
    const data = await res.json();
    return {
      ...token,
      error: null,
      accessToken: data.access_token,
      refreshToken: data.refreshToken,
      expiresIn: Date.now() + parseInt(data.expires_in) * 1000 - 2000,
    };
  } else {
    return {
      error: "RefreshTokenTokenError",
    };
  }
}; */

const globalForPrisma = global;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export const options = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      profile(profile) {
        console.log("Profile Google: ", profile);

        let userRole = "Google User";
        let userTest = "Alhamdulillah";
        return {
          ...profile,
          id: profile.sub,
          role: userRole,
          test: userTest,
        };
      },
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),

    GithubProvider({
      profile(profile) {
        console.log("Profile GitHub: ", profile);

        let userRole = "GitHub User";
        if (profile?.email == "jake@claritycoders.com") {
          userRole = "admin";
        }

        return {
          ...profile,
          role: userRole,
        };
      },
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email:",
          type: "text",
          placeholder: "your-email",
        },
        password: {
          label: "password:",
          type: "password",
          placeholder: "your-password",
        },
      },
      async authorize(credentials) {
        const foundUser = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        console.log(credentials);

        if (!foundUser) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          foundUser.hashedPassword
        );

        if (!passwordMatch) {
          return null;
        }

        /* const foundUser = await User.findOne({ email: credentials.email })
          .lean()
          .exec(); */

        /* if (foundUser) {
          const user = {
            email: foundUser.email,
            password: foundUser.password,
            role: foundUser.role,
            accountStatus: foundUser.accountStatus,
            myCredentials: credentials,
          }; */

        console.log(foundUser);

        return foundUser;
      },
    }),
    // ...add more providers here
  ],
  session: {
    // Set it as jwt instead of database
    strategy: "jwt",
  },
  /* callbacks: {
    async jwt({ token, user, credentials }) {
      if (user) {
        token.email = user.email;
        token.role = user.role;
        token.credentials = user.credentials;
      }
      return token;
    },

    async session({ session, token, user }) {
      if (session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  }, */
  /* debug: process.env.NODE_ENV === "development", */
};
