// 导入定义验证规则的模块
const joi = require('@hapi/joi')

// 定义 分类名称 和 分类别名 的校验规则
const name = joi.string().required()
const alias = joi.string().alphanum().required()
const id = joi.number().integer().min(1).required()
// 校验规则对象 - 添加分类
module.exports = {
    body: {
        name,
        alias,
        Id: id,
      }
}
