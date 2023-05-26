const Koa = require('koa');
// const koaRouter = require('koa-router');
const koaBody = require('koa-body').default;
const router = require('./controller');
const app = new Koa();
// const router = new koaRouter();
app.use(koaBody());
app.use(async (ctx, next) => {
  console.log('初始内容', ctx);
  next();
});
router.get('/getinfo/:id/shawn', async (ctx, next) => {
  ctx.body = 'index';
  next();
});
router.post('/', async (ctx, next) => {
  ctx.body = { code: 200, res: { id: 999, msg: '这是post返回的内容' } };
  next();
});
app.use(router.routes()); // 添加路由中间件
app.use(router.allowedMethods()); // 对请求进行一些限制处理
app.listen(3000, () => {
  console.log('服务器开启: http://localhost:3000/');
});
