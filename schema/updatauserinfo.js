const joi = require('@hapi/joi')


//更新验证规则

const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()

module.exports   = {
    body :{
        id,
        nickname,
        email
    }
}