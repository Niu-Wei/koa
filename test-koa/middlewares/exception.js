const {
    HttpException
} = require('../core/http-exception')

const config = require('../config/config')

const catchError = async (ctx, next) => {
    try {
        await next()

    } catch (error) {
        const isHttpException = error instanceof HttpException
        const isDev = config.environment === 'dev'

        if (isDev && !isHttpException) {
            throw error
        }

        // 生产环境
        if (isHttpException) {
            ctx.body = {
                msg: error.msg,
                error_code: error.errorCode,
                request: `${ctx.method} ${ctx.path}`
            }
            ctx.status = error.code

        } else {
            ctx.body = {
                msg: "未知错误！",
                error_code: 9999,
                request: `${ctx.method} ${ctx.path}`
            }
            ctx.status = 500
        }
    }
}

module.exports = catchError