import NextAuth from 'next-auth';

export const runtime = 'nodejs';

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [],
});

export { handler as GET, handler as POST };
