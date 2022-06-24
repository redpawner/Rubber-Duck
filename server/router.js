const Router = require('@koa/router');
const router = new Router();

router.get('/', () => console.log('router working'));

module.exports = router;
