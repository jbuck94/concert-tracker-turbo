import { auth } from 'express-oauth2-jwt-bearer';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { json } from 'body-parser';
import { InternalEnv, getInternalEnv, initializeRuntime } from 'runtime';
import { authHandler } from '@/src/handlers/auth';

import { Context } from './context';
import { getEnhancedDB } from '@/src/db';
import { schema } from './schema';

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
  await initializeRuntime(require('manifest.json'));

  app.use(json());
  app.use(
    cors<cors.CorsRequest>({
      origin: '*', // TODO: ALLOW LOCAL OR AUTH0
      credentials: true,
    })
  );

  app.get('/health', (_req, res) => res.status(200).json({ ok: true }));

  app.post('/webhook/auth', authHandler);

  app.use(
    '/graphql',
    (req, res, next) => {
      if (
        getInternalEnv() === InternalEnv.LOCAL &&
        (req.body.query as string).includes('query IntrospectionQuery')
      ) {
        return next();
      }

      return checkJwt(req, res, next);
    },
    expressMiddleware(server, {
      context: async ({ req }) => {
        if (req.auth?.payload.sub) {
          // Might need to go back to non-enhanced DB here if i use zenstack again
          const user = await getEnhancedDB().user.findFirst({
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

  await new Promise<void>((resolve) => {
    return httpServer.listen({ port: PORT }, resolve);
  });
});

export default app;
