import Koa from 'koa';
import parser from 'koa-bodyparser';
import cors from '@koa/cors';
import router from './router';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

const conn = require('./models/db');

const App = new Koa();
const PORT = process.env.PORT || 3002;

App.use(cors());
App.use(parser());
App.use(router.routes());

App.use(async (ctx: any, next: any) => {
  await next();
  if (ctx.status === 404) {
    ctx.body = '_404';
    ctx.status = 404;
  }
});

(async () => {
  App.listen(PORT, () =>
    console.log(`🚀 Server running at http://127.0.0.1:${PORT}/ 🚀`)
  );
})();
