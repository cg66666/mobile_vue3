const Koa = require('koa');
// const koaRouter = require('koa-router');
const koaBody = require('koa-body').default;
const router = require('./controller/server');
const handleResStatus = require('./middleware/handleResStatus');
const app = new Koa();
// app.use(async (ctx, next) => {
//   console.log('初始内容', ctx);
//   await next();
// });
// router.post('/', async (ctx, next) => {
//   ctx.body = { code: 200, res: { id: 999, msg: '这是post返回的内容' } };
//   await next();
// });
app.use(koaBody());
app.use(router.routes()); // 添加路由中间件
app.use(router.allowedMethods()); // 对请求进行一些限制处理
app.use(handleResStatus);
app.listen(8080, () => {
  console.log('服务器开启: http://localhost:8080/');
});
