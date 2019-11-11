const Router = require('koa-router')

const router = new Router()

router.get('/v1/api/b', (ctx, next) => {
    ctx.body = {
        name: 'james'
    }
})

router.post('/v1/api/test/:id', (ctx, next) => {
    // 获取参数 
    // ctx.params
    // ctx.request.query
    // ctx.request.header
    // ctx.request.body
    console.log(ctx.params)
    console.log(ctx.request.query)
    console.log(ctx.query)
    console.log(ctx.request.header)
    console.log(ctx.header)
    console.log(ctx.request.body)

    ctx.body = {
        name: 'james',
        number: 6
    }
})

module.exports = router