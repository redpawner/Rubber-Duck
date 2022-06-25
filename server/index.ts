import Koa from 'koa';
import parser from 'koa-bodyparser';
import cors from '@koa/cors';
import router from './router';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-koa';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import http from 'http';

dotenv.config({ path: './.env' });

const conn = require('./dbmodels/db');
const PORT = process.env.PORT || 3002;

(async (typeDefs, resolvers) => {
  const httpServer = http.createServer();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  const app = new Koa();

  app.use(cors());
  app.use(parser());
  app.use(router.routes());

  app.use(async (ctx: any, next: any) => {
    await next();
    if (ctx.status === 404) {
      ctx.body = '_404';
      ctx.status = 404;
    }
  });
  server.applyMiddleware({ app });
  httpServer.on('request', app.callback());
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  );
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
  return { server, app };
})();

// (async () => {
//   App.listen(PORT, () =>
//     console.log(`🚀 Server running at http://127.0.0.1:${PORT}/ 🚀`)
//   );
// })();
