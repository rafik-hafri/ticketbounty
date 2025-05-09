import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";  // Your Prisma client
import bcrypt from "bcrypt";
import { Session, User } from "next-auth";  // Import these types

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: { email: string; password: string }) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("No user found with that email");
        }

        const isValid = await bcrypt.compare(credentials.password, user.passwordHash);

        if (!isValid) {
          throw new Error("Invalid password");
        }

        return { id: user.id, email: user.email }; // Return the user object
      },
    }),
  ],
  session: {
    strategy: "database",  // Save sessions to the database
  },
  callbacks: {
    async session({ session, user }: { session: Session; user: User }) {
      // Add user information to session object
      if (session && user) {
        session.userId = user.id;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma), // Prisma adapter to save sessions in DB
};

export default NextAuth(authOptions);
