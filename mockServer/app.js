const Koa = require('koa');
// const koaRouter = require('koa-router');
const koaBody = require('koa-body').default;
// const koaStatic = require('koa-static');
const router = require('./controller/server');
const handleResStatus = require('./middleware/handleResStatus');
const ws = require('./ws/index');
const app = new Koa();

app.use(koaBody());
app.use(router.routes()); // 添加路由中间件
app.use(router.allowedMethods()); // 对请求进行一些限制处理
app.use(handleResStatus);
// app.use(koaStatic(__dirname + '/dist'));
const server = app.listen(8080, () => {
  let port = server.address().port;
  console.log('服务器开启: http://localhost:8080/', port);
});
ws(server);
