import { auth } from 'express-oauth2-jwt-bearer';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { json } from 'body-parser';

import { schema } from './schema';
import { Context } from './context';
import { authHandler } from '@/src/handlers/auth';
import db, { getEnhancedDB } from '@/src/db';

const PORT = Number(process.env.PORT) || 8080;

// Add production app url here
const ALLOWED_ORIGINS = ['http://localhost:3000'];

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer<Context>({
  schema,
  introspection: true,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

const checkJwt = auth({
  audience: ['concert-tracker-api', 'https://jamiewbuck.auth0.com/userinfo'],
  issuerBaseURL: 'https://jamiewbuck.auth0.com/',
});

server.start().then(async () => {
  app.use(json());

  app.use(
    cors<cors.CorsRequest>({
      origin: '*', // TODO: ALLOW LOCAL OR AUTH0
      credentials: true,
    })
  );

  app.post('/webhook/auth', authHandler);

  app.use(
    '/graphql',
    checkJwt,
    expressMiddleware(server, {
      context: async ({ req }) => {
        console.log('req.auth: ', req.auth);
        if (req.auth?.payload.sub) {
          const user = await db.user.findFirst({
            where: { authId: req.auth?.payload.sub },
          });

          return {
            user,
            db: getEnhancedDB(user),
          };
        }

        return {
          user: null,
          db: getEnhancedDB(),
        };
      },
    })
  );

  app.use(express.urlencoded({ limit: '50mb', extended: true }));
  app.use(express.json({ type: 'application/json', limit: '50mb' }));

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
});
