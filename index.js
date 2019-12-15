const Koa = require("koa");
const Router = require("koa-router");
const glob = require("glob"); // glob 支持文件遍历查寻
const logger = require("koa-logger"); // koa-logger 实现在终端打印node日志，方便调试
const { resolve } = require("path");
const fs = require("fs");

const app = new Koa();
const router = new Router({ prefix: "/api" });
const routerMap = {}; // 存放 文件路径与路由 的 映射

app.use(logger());

///////////////////////////////////////////////
//////////////////////////////////////////

// 下面简单定义一个路由, '/api/name' 返回: {'name': 'xn213'}
// router.get('/name', (ctx, next) => {
//   ctx.body = {
//     name: 'xn213'
//   }
// })

//请求方式 http://域名/product/123
// router.get('/product/:aid', async (ctx, next)=>{
//   console.log(ctx.params) // { aid: '123' } // 获取动态路由的数据
//   ctx.body = '这是商品页面'
// });

//////////////////////////////////////////
///////////////////////////////////////////////

// 注册路由
glob.sync(resolve("./api", "**/*.json")).forEach((item, i) => {
  let apiJsonPath = item && item.split("/api")[1];
  let apiPath = apiJsonPath.replace(".json", "");
  console.log(item, apiJsonPath, apiPath);

  router.get(apiPath, (ctx, next) => {
    // http://localhost:3000/newscontent?aid=123
    //从ctx中读取get传值
    console.log("ctx.query: ", ctx.query); // { aid: '123' } 获取的是对象 用的最多的方式  **推荐**
    console.log("ctx.querystring: ", ctx.querystring); // aid=123&name=zhangsan  获取的是一个字符串
    console.log("ctx.url: ", ctx.url); // 获取url地址

    // ctx 里面的 request 里面获取 get 传值
    console.log(ctx.request.url);
    console.log(ctx.request.query); // { aid: '123', name: 'zhangsan' } 对象
    console.log(ctx.request.querystring); // aid=123&name=zhangsan

    try {
      console.log(item);
      let jsonStr = fs.readFileSync(item).toString();
      ctx.body = {
        data: JSON.parse(jsonStr),
        status: 200,
        type: "success" // 自定义响应体
      };
    } catch (err) {
      console.log(err);
      ctx.body = {
        status: 404,
        type: "false"
      };
      ctx.throw("服务器错误: ", 500);
    }
  });
  routerMap[apiJsonPath] = apiPath;
});

fs.writeFile("./routerMap.json", JSON.stringify(routerMap, null, 4), err => {
  if (!err) {
    console.log("./routerMap.json", "路由地图生成成功!");
  }
});

/**
 * router.routes() // 启动路由
 * router.allowedMethods()作用：这是官方文档的推荐用法, 我们可以
 * 看到 router.allowedMethods() 用在了路由匹配 router.routes() 之后,
 * 所以在当所有路由中间件最后调用. 此时根据 ctx.status 设置 response 响应头
 */
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log("app started at port 3000...");
});
