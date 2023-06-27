module.exports = async (ctx, next) => {
  // console.log('后', ctx.success);
  if (ctx.success) {
    ctx.success.code = 0;
    ctx.body = ctx.success;
  } else if (ctx.fail) {
    if (!ctx.fail.code) ctx.fail.code = 404;
    ctx.body = ctx.fail;
  }
  await next();
};
