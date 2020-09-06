const joi = require('@hapi/joi')


const id = joi.number().integer().min(1).required()

// 注册和登录表单的验证规则对象 
module.exports = {
     // 表示需要对 req.body 中的数据进行验证
     params:{ id }
       


}


