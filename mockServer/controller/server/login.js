const koaRouter = require('koa-router');
const router_login = new koaRouter();
const userInfo = require('../../data/userInfo.json');
const jwt = require('jsonwebtoken');
const secret = 'Jwt%._CYweb#';
const expiresIn = 60 * 60;
router_login.post('/', async (ctx, next) => {
  console.log(111);
  const { loginInfo } = ctx.request.body;
  let accountId = false;
  let accountName = '';
  for (let item of userInfo) {
    if (item.phone == loginInfo.phone && item.password == loginInfo.password) {
      accountId = item.id;
      accountName = item.name;
      break;
    }
  }
  if (accountId) {
    let token = jwt.sign({ id: accountId }, secret, { expiresIn });
    // 存储在cookie中，暂时没用，建议还是存储在localstorage中
    ctx.cookies.set('x-token', token);
    ctx.success = {
      msg: `登陆成功`,
      data: { name: accountName, token }
    };
  } else {
    ctx.fail = {
      msg: `登陆失败，手机号或者密码错误`,
      data: {},
      code: 1
    };
  }
  await next();
});
router_login.get('/getInfo', async (ctx, next) => {
  const token = ctx.header['x-token'];
  try {
    const handleToken = jwt.verify(token, secret);
    let name = '';
    for (let item of userInfo) {
      if (handleToken.id === item.id) {
        name = item.name;
        break;
      }
    }
    if (name) {
      ctx.success = {
        msg: '',
        data: { name }
      };
    } else {
      ctx.success = {
        msg: '登录信息失效，请重新登录',
        data: {}
      };
    }
  } catch (e) {
    ctx.success = {
      msg: '登录信息失效，请重新登录',
      data: {}
    };
  }
  await next();
});
module.exports = router_login;
