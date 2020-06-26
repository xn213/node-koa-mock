const Koa = require('koa')
const path = require('path')
const static = require('koa-static')

const app = new Koa()

// 只允许访问文件夹 ./static 文件夹里的内容
const staticPath = './static'

app.use(static(path.join(__dirname, staticPath))
// 访问 localhost:2113/love.png index.css .js

app.use(async(ctx, next) => {
  ctx.body = 'hellow koa-static'
})

app.listen(2113, ()=> {
  console.log('app started at port 2113')
})
