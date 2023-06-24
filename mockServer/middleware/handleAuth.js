const jwt = require('jsonwebtoken');
const secret = require('../data/jwt_ecret');
module.exports = async (ctx, next) => {
  const token = ctx.header['x-token'];
  console.log('token', token);
  try {
    jwt.verify(token, secret);
  } catch (e) {
    ctx.success = {
      msg: '请登录',
      data: {}
    };
  }
  await next();
};
