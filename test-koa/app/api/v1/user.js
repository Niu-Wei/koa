const Router = require('koa-router')
const uuid = require('node-uuid')

const {
  User
} = require('../../models/user')
const {
  Success
} = require('../../../core/http-exception')
const userValidator = require('../../validators/user')

const router = new Router({
  prefix: '/v1/user'
})

// 用户注册
router.post('/register', userValidator, async (ctx) => {
  const {
    nickname,
    email,
    password2
  } = ctx.request.body

  const user = {
    nickname,
    email,
    password: password2,
    userId: uuid.v1()
  }

  await User.create(user)

  throw new Success('注册成功')
})

module.exports = router