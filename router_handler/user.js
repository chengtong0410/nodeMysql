const db  = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwtKey = require('../tokenKey')
// 注册
const regUser = (req, res) => { 
    const  userInfo = req.body
    //1.判断请求数据非空
    // if (!userInfo.username || !userInfo.password) return  res.send({ status:1,msg :'用户名或密码不合法'})
    if (!userInfo.username || !userInfo.password) return res.cc('用户名或密码不合法')
    //2.不为空 查询数据库 是否username是否存在
    const regsql = 'select * from ev_users where username = ?' 
    db.query(regsql ,userInfo.username ,(err,resoult)=>{

        // if (err) return  res.send({status:1,msg:err.message})
        if (err) return res.cc(err.message)

        // if (resoult.length>0) return  res.send({status:1,msg:'用户名已经存在'})
        if (resoult.length>0) return  res.cc('用户名已经存在')

        //3. 如果提交的数据符合存储要求,对user.password进行加密
        // 3.1加密
        userInfo.password = bcrypt.hashSync(userInfo.password,10)
        //3.2插入到数据库
        const insterSql = 'insert into ev_users set ? '
        db.query(insterSql,{...userInfo},(err,insRes)=>{

            // if (err) return res.send({status: 1 ,msg:err.message})
            if (err) return res.cc(err.message)

            // if (insRes.affectedRows != 1) return res.send({status: 1 ,msg:'添加数据库失败'})
            if (insRes.affectedRows !== 1) return res.cc('添加数据库失败')

            res.send({
                status:0,
                msg:'注册用户成功'
            })
        })
        
    })

   
 }
//登录
const login =   (req, res) => { 
    //1- 接受用户数据
const userInfo = req.body
const selectSql = 'select * from ev_users where username = ?'
db.query(selectSql , userInfo.username,(loginErr , loginRes)=>{
    //1-1查询数据量错误
    if (loginErr)  return res.cc(loginErr)
    // 1-2 判断是否存在用户
    if(loginRes.length !== 1) return  res.cc('用户名或密码错误')
    //1-3 判断用户密码是否正确   bcrypt.compareSync返回一个boolearn值
    const   pwdCompare = bcrypt.compareSync(userInfo.password,loginRes[0].password)
    if (!pwdCompare) return res.cc('密码错误 请重试 !!!')

    
    //1-4 token处理
    const user = {...loginRes[0],password:'',user_pic:''}
       //利用josnwebtoken包生成token
    tokenStr = jwt.sign(user,jwtKey.secretKey,{expiresIn:'10h'})
    res.send({
        status:0,
        msg:'用户登录成功',
        token:'Bearer '+tokenStr
    })
})
    
    
    
   // res.send('login OK')
 }

module.exports ={
    regUser,
    login
}