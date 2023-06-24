const Koa = require('koa');
// const koaRouter = require('koa-router');
const koaBody = require('koa-body').default;
const router = require('./controller/server');
const handleResStatus = require('./middleware/handleResStatus');
const app = new Koa();
app.use(koaBody());
app.use(router.routes()); // 添加路由中间件
app.use(router.allowedMethods()); // 对请求进行一些限制处理
app.use(handleResStatus);
app.listen(8080, () => {
  console.log('服务器开启: http://localhost:8080/');
});
