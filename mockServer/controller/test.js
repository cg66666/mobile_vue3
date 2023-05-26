const koaRouter = require('koa-router');
const router_test = new koaRouter();
router_test.get('/login', (ctx, next) => {
  ctx.body = {
    code: 0,
    masg: `这是'test/login'`
  };
  next();
});
router_test.get('/getMsg', (ctx, next) => {
  ctx.body = {
    code: 0,
    masg: `这是'test/getMsg'`
  };
  next();
});
router_test.post('/getInfo', (ctx, next) => {
  console.log('getInfo++', ctx);
  ctx.body = {
    code: 0,
    masg: `这是'test/getMsg'`
  };
  next();
});
module.exports = router_test;
