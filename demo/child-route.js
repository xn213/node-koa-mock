const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()

// 子路由
let home = new Router()
home.get('/xn213', async (ctx) => {
  ctx.body = 'home xn213 page'
}).get('/todo', async (ctx) => {
  ctx.body = 'home todo page'
})

// 子路由
let page = new Router()
page.get('/xn213', async (ctx) => {
  ctx.body = 'page xn213 page'
}).get('/todo', async (ctx) => {
  ctx.body = 'page todo page'
})

// 父路由
// 路由前缀 option: { prefix }
const router = new Router({
  prefix: '/xn'
})

router.use('/home', home.routes(), home.allowedMethods())
router.use('/page', page.routes(), page.allowedMethods())


app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(2113, () => {
  console.log('app started at port 2113')
})
