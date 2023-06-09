const koaRouter = require('koa-router');
const router_home = new koaRouter();
const getHomeSearchData = require('../../data/home_search.json');
const homeInfo = require('../../data/home_page.json');
router_home.get('/search', async (ctx, next) => {
  // console.log('111login++', ctx.query, getHomeSearchData);
  const math = Math.round(Math.random() * 100);
  // const math = 1;
  console.log('随机数', math);
  if (math > 90) {
    ctx.fail = {
      msg: `系统出错，请重试`
    };
  } else if (math < 20) {
    ctx.success = {
      msg: `内容为空`,
      data: []
    };
  } else {
    ctx.success = {
      msg: `这是'home/search'`,
      data: getHomeSearchData
    };
  }
  // async function delay(time) {
  //   return new Promise(function (resolve) {
  //     setTimeout(function () {
  //       resolve();
  //     }, time);
  //   });
  // }
  // await delay(1000);

  await next();
});
router_home.get('/getInfo', async (ctx, next) => {
  ctx.success = {
    msg: `这是'home/search'`,
    data: homeInfo
  };
  await next();
});
router_home.post('/getInfo', async (ctx, next) => {
  console.log('getInfo++', ctx.request.body);
  ctx.body = {
    code: 0,
    msg: `这是 get 'home/getMsg'`
  };
  await next();
});
module.exports = router_home;
