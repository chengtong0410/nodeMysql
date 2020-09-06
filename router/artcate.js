const express = require('express')
const router  =  express.Router()
const expressJoi = require('@escook/express-joi')
const addArt = require('../schema/add_artcate')
const deleteArt = require('../schema/deletart')
const updateCateFromId = require('../schema/updatecate')
const {getArtcateList ,addArtcateType,deleteCateById,getArtCateById,updateCateById} = require('../router_handler/artcates')
 
router.get('/cates',getArtcateList)
router.post('/addcates',expressJoi(addArt),addArtcateType)
router.get('/deletecate/:id',expressJoi(deleteArt), deleteCateById)
router.get('/cates/:id',expressJoi(deleteArt),getArtCateById)
router.post('/updatecate',expressJoi(updateCateFromId), updateCateById)
module.exports = router