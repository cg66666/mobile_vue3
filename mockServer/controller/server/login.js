const koaRouter = require('koa-router');
const router_login = new koaRouter();
const userInfo = require('../../data/userInfo.json');
const jwt = require('jsonwebtoken');
const secret = require('../../data/jwt_ecret');
const handleAuth = require('../../middleware/handleAuth');
const expiresIn = 60 * 60;
// const expiresIn = 60;
router_login.post('/', async (ctx, next) => {
  // console.log('secret', secret);
  const { loginInfo } = ctx.request.body;
  const targetAccount = userInfo.find((item) => {
    if (item.phone == loginInfo.phone && item.password == loginInfo.password) return true;
  });
  if (targetAccount) {
    let token = jwt.sign({ id: targetAccount.id }, secret, { expiresIn });
    // 存储在cookie中，暂时没用，建议还是存储在localstorage中
    ctx.cookies.set('x-token', token);
    ctx.success = {
      msg: `登陆成功`,
      data: { name: targetAccount.name, token }
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
router_login.post('/verifyToken', handleAuth, async (ctx, next) => {
  if (!ctx.success) {
    ctx.success = {
      code: 0,
      msg: `token有效`,
      data: { ok: 1 }
    };
  }
  await next();
});
router_login.get('/getInfo', handleAuth, async (ctx, next) => {
  if (!ctx.success) {
    const token = ctx.header['x-token'];
    const handleToken = jwt.verify(token, secret);
    const targetAccount = userInfo.find((item) => {
      if (handleToken.id === item.id) return true;
    });
    if (targetAccount) {
      ctx.success = {
        msg: '',
        data: { name: targetAccount.name }
      };
    } else {
      ctx.success = {
        msg: '账号异常',
        data: {}
      };
    }
  }
  await next();
});

module.exports = router_login;
