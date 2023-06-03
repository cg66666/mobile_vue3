const koaRouter = require('koa-router');
const router_test = new koaRouter();
router_test.get('/login', async (ctx, next) => {
  console.log('login++', ctx.query);
  ctx.body = {
    code: 0,
    msg: `这是'test/login'`
  };
  await next();
});
router_test.get('/getMsg', async (ctx, next) => {
  ctx.body = {
    code: 0,
    msg: `这是'test/getMsg'`
  };
  await next();
});
router_test.get('/getInfo', async (ctx, next) => {
  ctx.body = {
    code: 0,
    msg: `这是 get 'test/getMsg'`
  };
  await next();
});
router_test.post('/getInfo', async (ctx, next) => {
  console.log('getInfo++', ctx.request.body);
  ctx.body = {
    code: 0,
    msg: `这是 get 'test/getMsg'`
  };
  await next();
});
module.exports = router_test;
