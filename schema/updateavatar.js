
const joi = require('@hapi/joi')

// dataUri() 指的是如下格式的字符串数据：
// data:image/png;base64,VE9PTUFOWVNFQ1JFVFM=
const avatar = joi.string().dataUri().required()


module.exports   = {
    body :{
        avatar
    }
}