const {
  ParameterException
} = require('../../core/http-exception')


module.exports = async (ctx, next) => {

  const {
    nickname,
    email,
    password1,
    password2
  } = ctx.request.body

  if (!nickname || nickname.length < 4 || nickname.length > 16) {
    throw new ParameterException('昵称长度为4到16')
  }

  const patternEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
  if (!email || !patternEmail.test(email)) {
    throw new ParameterException('不符合邮箱规范')
  }

  const patternPwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]/
  if (!password1 || !patternPwd.test(password1)) {
    throw new ParameterException('密码包含字母、数字和 _ ')
  }

  if (password2 !== password1) {
    throw new ParameterException('两次密码须一致')
  }

  await next()
}