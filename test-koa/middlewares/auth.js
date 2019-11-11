const jwt = require('jsonwebtoken')
const {
  Forbidden
} = require('../core/http-exception')
const config = require('../config/config')

class Auth {
  static async verifyToken(ctx, next) {
    const {
      token
    } = ctx.header
    console.log('---token---', token)

    if (!token) {
      throw new Forbidden('token不能为空')
    }

    try {
      var decode = jwt.verify(token, config.security.secretKey)
    } catch (err) {
      console.log('---err---', err, err.name)

      if (err.name === 'TokenExpiredError') { // token 过期 // 如果随便写 abc,err.name = 'JsonWebTokenError'
        throw new Forbidden('token已过期')
      }

      throw new Forbidden('token不合法')
    }


    console.log('---decode---', decode)
    ctx.auth = {

    }

    await next()
  }

}

module.exports = Auth