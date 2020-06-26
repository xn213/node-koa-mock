const Koa = require('koa')
const views = require('koa-views')
const path = require('path')

const app = new Koa()

app.use(views(path.join(__dirname, './view'), {
  extension: 'ejs'
}))

app.use(async (ctx, next) => {
  let title = 'xn213'
  await ctx.render('index', { title })
})

app.listen(2113, () => {
  console.log('app started at port 2113')
})
