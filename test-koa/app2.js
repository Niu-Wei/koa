const axios = require('axios')
const Koa = require('koa')

const app = new Koa()

app.use(async (ctx, next) => {
    console.log(ctx)
    console.log('---ctx.path---', ctx.path)
    if (ctx.path === '/a/b') {
        ctx.body = 'wade333'
    }
    if (ctx.path === '/c/d') {
        ctx.body = {
            name: 'james'
        }
    }
    const res = await next()
})

app.use(async (ctx, next) => {
    const res = await axios.get('https://www.baidu.com')
    // console.log('---res---', res)
    return res
})

app.listen(8081)