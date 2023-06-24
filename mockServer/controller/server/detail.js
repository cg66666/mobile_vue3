const koaRouter = require('koa-router');
const router_test = new koaRouter();
const handleAuth = require('../../middleware/handleAuth');
router_test.get('/getInfo', handleAuth, async (ctx, next) => {
  if (!ctx.success) {
    ctx.success = {
      code: 0,
      msg: `商品详情页的内容`,
      data: { ok: 1 }
    };
  }
  await next();
});
module.exports = router_test;
