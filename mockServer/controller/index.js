/**
 * 文件名就是请求的前置route
 */
const koaRouter = require('koa-router');
const fs = require('fs');
const path = require('path');
const router = new koaRouter();
const files = fs.readdirSync(__dirname);
files
  .filter((f) => {
    return f.endsWith('.js') && !f.startsWith('index');
  })
  .forEach((file) => {
    const file_name = file.substring(0, file.length - 3);
    const file_entity = require(path.join(__dirname, file));
    router.use(`/${file_name}`, file_entity.routes(), file_entity.allowedMethods());
  });

module.exports = router;
