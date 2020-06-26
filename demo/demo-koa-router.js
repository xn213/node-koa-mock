const Koa = require('koa')
const Router = require('koa-router')

const router = new Router()
const app = new Koa()

router
  .get('/', (ctx, next) => {
    ctx.body = 'hello xn213'
  })
  .get('/todo', (ctx, next) => {
    ctx.body = 'todo'
  })

app
  .use(router.routes())
  .use(router.allowedMethods()) // allowedMethods() 设置的get, post则会报错

const port = 2113
app.listen(port, () => {
  console.log(`app started at port ${port}`)
})
