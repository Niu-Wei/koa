const Router = require('koa-router')

const router = new Router()

router.get('/v1/api/a', (ctx, next) => {
    ctx.body = {
        name: 'wade'
    }
})

module.exports = router