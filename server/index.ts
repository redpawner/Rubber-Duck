import Koa from 'koa';
import parser from 'koa-bodyparser';
import cors from '@koa/cors';
import { ApolloServer } from 'apollo-server-koa';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import http from 'http';
import graphqlSchema from './models/schema';
import validateAuthorization from './middleware/authentication';

const PORT = process.env.PORT || 3002;

(async () => {
  const httpServer = http.createServer();

  const server = new ApolloServer({
    schema: graphqlSchema,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: (ctx) => ctx,
  });

  await server.start();

  const app = new Koa();

  app.use(cors());
  app.use(parser());

  app.use((ctx) => console.log(ctx.url));

  app.use(validateAuthorization);

  app.use(async (ctx: any, next: any) => {
    await next();
    if (ctx.status === 404) {
      ctx.body = '_404';
      ctx.status = 404;
    }
  });

  server.applyMiddleware({ app });

  httpServer.on('request', app.callback());

  const io = require('socket.io')(httpServer, {
    cors: {
      origin: 'http://localhost:3000',
    },
  });

  io.on('connection', function (socket: any) {
    console.log('io server connected');
    socket.on('sendMessage', function (data: any) {
      io.emit('receiveMessage', data);
    });
  });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  );

  console.log(
    `🦆 Server ready at http://localhost:${PORT}${server.graphqlPath} 🦆`
  );

  return { server, app };
})();
