const Koa = require('koa');
const App = new Koa();
const parser = require('koa-bodyparser');
const cors = require('@koa/cors');
const PORT = process.env.PORT || 3002;

App.use(parser()).use(cors());

App.listen(PORT, () => {
  console.log(`🚀 Server listening at http://127.0.0.1:${PORT}/ 🚀`);
});
