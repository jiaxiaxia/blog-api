/**
 * Created by jiaxiaxia on 2017/9/11.
 * @ use 统一try catch处理中间件
 * @ 用于捕获内部错误，输出日志信息
 */

const formatError = (error) => {
  console.log('dd',error)
  let errorObj = {}
  for (let key in error.errors) {
    errorObj[key] = `${error.errors[key].message}`
  }
  return errorObj
}

const tracer = require('tracer');
const logger = tracer.colorConsole({
  level: 'error',
  format: '{{timestamp}} <{{title}}> {{file}}(#{{line}}): {{message}}',
  file: 'error.log',
  path: __dirname
});

module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.log(err)
    if (!err) {
      return ctx.error({ msg: new Error('未知错误!') });
    }
    if (typeof(err) == 'string') {
      return ctx.error({ msg: new Error(err) });
    }
    logger.error(err.stack);
    ctx.error({ msg: '服务器错误!', error: formatError(err), status: ctx.status });
  }
}
