const Router = require('koa-router')

const router = new Router()

router.get('/v2/api/a', (ctx, next) => {
    ctx.body = {
        name: 'kobe'
    }
})

module.exports = router