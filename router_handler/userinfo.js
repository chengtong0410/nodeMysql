const  db  = require('../db/index')
const bcrypt = require('bcryptjs')
const { connect } = require('../router/userInfo')
//获取用户信息
const getUserInfo = (req,res)=>{
    const  selectSql = 'select id, username, nickname, email, user_pic from ev_users where id=? '
    db.query(selectSql,req.user.id,(err,results)=>{
        if (err)  return  res.cc(err)
        if (results.length !== 1) return res.cc('获取用户信息失败！') 
        // 3. 将用户信息响应给客户端 
        res.send({ status: 0, message: '获取用户基本信息成功！', data: results[0] })

    })

}
//更新用户信息
const updateUser = (req,res)=>{
    const updateSql = 'update  ev_users set ? where id = ?'
    db.query(updateSql,[req.body , req.body.id],(err,updateRes)=>{
        if (err)  return  res.cc(err)
        if (updateRes.affectedRows !== 1) return res.cc('修改用户基本信息失败！')
        
        res.cc('修改用户信息成功',0)
       
    })
}

//修改用户密码
const updatePwd = (req,res)=>{
   const pwdSql =  'select * from ev_users where id = ?'
   db.query(pwdSql,req.user.id,(err,pwdRes)=>{
       // 执行 SQL 语句失败
   if (err) return res.cc(err)
    // 检查指定 id 的用户是否存在
   if (pwdRes.length !== 1) return res.cc('用户不存在！')

   const compareResult = bcrypt.compareSync(req.body.oldPwd, pwdRes[0].password)
   if (!compareResult) return res.cc('原密码错误！')

   const newPwd =  bcrypt.hashSync(req.body.newPwd,10)

   const updatePwdSql = 'update  ev_users set password = ? where id = ?'
   db.query(updatePwdSql,[newPwd , req.user.id],(err,updateRes)=>{
       if (err)  return  res.cc(err)
       if (updateRes.affectedRows !== 1) return res.cc('修改用户密码失败！')
       
       res.cc('修改用户密码成功',0)
      
   })
   })
   
}
const updateAvatar = (req,res)=>{

const sql = 'update ev_users set user_pic=? where id=?'
   //调用 db.query() 执行 SQL 语句，更新对应用户的头像：
db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
  // 执行 SQL 语句失败
  if (err) return res.cc(err)

  // 执行 SQL 语句成功，但是影响行数不等于 1
  if (results.affectedRows !== 1) return res.cc('更新头像失败！')

  // 更新用户头像成功
  return res.cc('更新头像成功！', 0)
})
}
module.exports = {
    getUserInfo,
    updateUser,
    updatePwd,
    updateAvatar
}