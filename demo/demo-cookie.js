const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()

app.use(async (ctx, next) => {
  if (ctx.url === '/index') {
    ctx.cookies.set(
      'MyName', 'xn213', {
      demain: '127.0.0.1',
      // path: '/index', // 如下 else 其他页面访问不到 Cookie 因为路径不是 /index
      maxAge: 1000 * 60 * 60 * 24,
      expires: new Date('2020-07-01'),
      httpOnly: false,
      overwrite: false
    }
    )
    ctx.body = 'Cookie is OK'
  } else {
    if (ctx.cookies.get('MyName')) {
      ctx.body = ctx.cookies.get('MyName')
    } else {
      ctx.body = 'Cookie is none'
    }

  }
})

const port = 2113
app.listen(port, () => {
  console.log(`app started at port ${port}`)
})
