const Router = require('koa-router')

const tokenAuth = require('../../../middlewares/auth')
// const userValidator = require('../../validators/user')
const {
  User
} = require('../../models/user')

const router = new Router({
  prefix: '/v1/app'
})

// 用户注册
router.post('/appList', tokenAuth.verifyToken, async (ctx) => {

  // User.findOne({
  //   where: {
  //     email: ctx.request.body.email
  //   }
  // }).then((res) => {
  //   console.log('---res---', res)
  //   ctx.body = 'aaaaa66'
  //   console.log('---ctx.body---', ctx.body)
  // })

  ctx.body = 'aaaaa99'
})

module.exports = router