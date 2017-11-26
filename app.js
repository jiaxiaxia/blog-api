const Koa = require('koa')
const mongoose = require('mongoose');
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
import { DB } from './config'

const users = require('./routes/users')
const drafts = require('./routes/drafts')
const tags = require('./routes/tags')

mongoose.connect(`mongodb://${DB.host}:${DB.port}/${DB.database}`)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('opened')
});
// error handler
const app = new Koa()
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
// app.use(json())
app.use(logger())


// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)

})


// routes
app.use(require('./middlewares/response'));
app.use(require('./middlewares/filter'));
app.use(users.routes())
app.use(users.allowedMethods())
app.use(drafts.routes())
app.use(drafts.allowedMethods())
app.use(tags.routes())
app.use(tags.allowedMethods())


// response
app.on('error', function(err, ctx) {
  console.log(err)
  logger.error('server error', err, ctx);
  ctx.render('error', { message: ' 服务器错误!', error: err });
});

module.exports = app
