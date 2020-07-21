import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const options = {
  site: process.env.SITE_URL,
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  database: {
    type: 'postgres',
    name: 'next-auth-connection',
    url: process.env.DATABASE_URL,
    synchronize: process.env.NODE_ENV !== 'production',
  },
  secret: process.env.SESSION_SECRET,
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
};

export default (req, res) => NextAuth(req, res, options);
