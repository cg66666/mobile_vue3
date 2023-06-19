module.exports = async (ctx, next) => {
  // console.log('后', ctx.success);
  if (ctx.success) {
    console.log('现在是成功状态');
    ctx.success.code = 0;
    ctx.body = ctx.success;
  } else if (ctx.fail) {
    console.log('现在是失败状态');
    if (!ctx.fail.code) ctx.fail.code = 404;
    ctx.body = ctx.fail;
  }
  await next();
};
