const express = require('express')
const cors = require('cors')
const router = require('./router/user')
const userInfoRouter = require('./router/userInfo')
const app = express()
const joi =require('@hapi/joi')
const expressJwk = require('express-jwt')
const tokenKey = require('./tokenKey')
const  cateRouter = require('./router/artcate')
const articleRouter = require('./router/article')
app.use(cors())//跨域
app.use('/uploads', express.static('uploads'))
app.use(express.urlencoded({extended:false}))   //x-www-form-urlencoded

//添加中间件在 res上挂载 错误的响应对象 
app.use((req,res,next)=>{
    res.cc = (err,status = 1)=>{
        res.send({
            status,
            msg: err instanceof Error ? err.message : err
        })
    }
    next()
})
//添加请求的token解析 如果解密认证后不符合抛出错误
app.use(expressJwk({secret:tokenKey.secretKey}).unless({path:/^\/api/}))

//路由
app.use('/api', router)
app.use('/my',userInfoRouter)
app.use('/my',cateRouter)
app.use('/my/article',articleRouter)

app.use((err,req,res,next)=>{
    if (err instanceof joi.ValidationError)  return  res.cc(err)
    if (err.name === 'UnauthorizedError') return  res.cc('用户验证失败')
        
    res.cc(err)
    next()
})

app.listen(80,()=>{
console.log('本地服务器搭建成功  -- http://127.0.0.1')
})