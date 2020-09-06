const express = require('express')
const expressJoi = require('@escook/express-joi')
const router  =  express.Router()
const updataUserInfo = require('../schema/updatauserinfo')
const updatePWD = require('../schema/updatepwd')
const updateAVATAR = require('../schema/updateavatar')
const { getUserInfo,updateUser,updatePwd,updateAvatar} =require('../router_handler/userinfo')

//获取用户信息
router.get('/userinfo',getUserInfo)
//更新用户信息
router.post('/userinfo',expressJoi(updataUserInfo),updateUser)
//重置密码
router.post('/updatepwd',expressJoi(updatePWD),updatePwd)
//更新用户头像
router.post('/update/avatar',expressJoi(updateAVATAR), updateAvatar)
module.exports = router