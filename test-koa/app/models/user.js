const {
  Sequelize,
  Model
} = require('sequelize')
const bcrypt = require('bcryptjs')
const {
  sequelize
} = require('../../core/db')
const {
  AuthFailed
} = require('../../core/http-exception')

// 定义用户模型
class User extends Model {

  static async verifyEmailPwd(email, plainPwd) {
    // 查询用户
    const user = await User.findOne({
      where: {
        email
      }
    })

    if (!user) {
      throw new AuthFailed('账号不存在')
    }

    // 验证密码
    const correct = bcrypt.compareSync(plainPwd, user.password)

    if (!correct) {
      throw new AuthFailed('密码不正确')
    }

    return user
  }
}

// 初始用户模型
User.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: Sequelize.STRING,
    unique: true
  },
  nickname: Sequelize.STRING,
  email: {
    type: Sequelize.STRING(128),
    unique: true
  },
  password: {
    // 扩展 设计模式 观察者模式
    // Vue3.0
    type: Sequelize.STRING,
    set(val) {
      // 加密
      const salt = bcrypt.genSaltSync(10)
      // 生成加密密码
      const psw = bcrypt.hashSync(val, salt)
      // this是 User 的实例，setDataValue是挂载在Model原型上的方法
      this.setDataValue("password", psw)
    }
  }
}, {
  sequelize,
  tableName: 'user2'
})


module.exports = {
  User
}