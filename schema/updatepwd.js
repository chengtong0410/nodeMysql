const joi = require('@hapi/joi')


//更新密码验证规则
const password = joi.string().pattern(/^[\S]{6,12}$/).required()
module.exports   = {
    
        body: {
            // 使用 password 这个规则，验证 req.body.oldPwd 的值
            oldPwd: password,
            // 使用 joi.not(joi.ref('oldPwd')).concat(password) 规则，验证 req.body.newPwd 的值
            // 解读：
            // 1. joi.ref('oldPwd') 表示 newPwd 的值必须和 oldPwd 的值保持一致
            // 2. joi.not(joi.ref('oldPwd')) 表示 newPwd 的值不能等于 oldPwd 的值
            // 3. .concat() 用于合并 joi.not(joi.ref('oldPwd')) 和 password 这两条验证规则
            newPwd: joi.not(joi.ref('oldPwd')).concat(password),
          },
    
}