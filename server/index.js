require('dotenv').config();

const conn = require('./models/db');

const Koa = require('koa');
const App = new Koa();
const parser = require('koa-bodyparser');
const cors = require('@koa/cors');
const PORT = process.env.PORT || 3002;
const router = require('./router');

App.use(cors());
App.use(parser());
App.use(router.routes());

App.use(async (ctx, next) => {
  await next();
  if (ctx.status === 404) {
    ctx.body = _404;
    ctx.status = 404;
  }
});

(async () => {
  App.listen(PORT, () =>
    console.log(`🚀 Server running at http://127.0.0.1:${PORT}/ 🚀`)
  );
})();
