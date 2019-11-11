const {
  ParameterException
} = require('../../core/http-exception')


module.exports = (params) => {

  const {
    email,
    password
  } = params

  if (!email) {
    throw new ParameterException('邮箱不为空')
  }

  if (!password) {
    throw new ParameterException('密码不为空')
  }

  return params
}