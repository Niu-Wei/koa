const Router = require('koa-router')
const jwt = require('jsonwebtoken')

const tokenValidator = require('../../validators/token')
const {
  User
} = require('../../models/user')

const {
  secretKey,
  expiresIn
} = require('../../../config/config').security

const router = new Router({
  prefix: '/v1/token'
})

// 用户注册
router.post('/', async (ctx) => {
  const {
    email,
    password
  } = tokenValidator(ctx.request.body)

  const user = await User.verifyEmailPwd(email, password)

  const token = jwt.sign({
    uid: user.id,
    scope: 3
  }, secretKey, {
    expiresIn
  })

  ctx.body = {
    token,
    status: 200,
    msg: 'success'
  }
})

module.exports = router