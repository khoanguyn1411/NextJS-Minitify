import NextAuth, { type DefaultUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { getUserProfile } from "@/core/apis/users";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "username", type: "text" },
      },
      async authorize(credentials) {
        if (credentials?.username == null) {
          return null;
        }
        const userProfile = await getUserProfile({
          username: credentials.username,
        });
        return userProfile as unknown as DefaultUser;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
