const db = require('../db/index')

const getArtcateList = (req, res) => {
    const artSql = 'select * from ev_article_cate where is_delete=0 order by id asc'
    db.query(artSql, (err, artRes) => {

        if (err) return res.cc('sql语句执行错误')
        if (artRes.length === 0) res.cc('查询文章列表为空')

        res.send({
            status: 0,
            msg: '获取文章列表成功',
            data: artRes
        })
    })


}
const addArtcateType = (req, res) => {
    const addSql = `select * from ev_article_cate where name=? or alias=?`
    db.query(addSql, [req.body.name, req.body.alias], (err, addRes) => {
        if (err) return res.cc('查询数据库报错')
        // 分类名称 和 分类别名 都被占用
        if (addRes.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！')
        if (addRes.length === 1 && addRes[0].name === req.body.name && addRes[0].alias === req.body.alias) return res.cc('分类名称与别名被占用，请更换后重试！')
        // 分类名称 或 分类别名 被占用
        if (addRes.length === 1 && addRes[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！')
        if (addRes.length === 1 && addRes[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！')
        const addArtSql = `insert into ev_article_cate set ?`
        db.query(addArtSql, req.body, (adderr, addedRes) => {
            if (adderr) return res.cc('查询数据库报错')
            if (addedRes.affectedRows !== 1) return res.cc('新增文章分类失败！')
            console.log(addedRes);
            res.cc('添加文章分类成功', 0)
        })
    })
}
const deleteCateById =  (req, res) => {
    // 定义删除文章分类的 SQL 语句：
    const sql = `update ev_article_cate set is_delete=1 where id=?`
    // Copy to clipboardErrorCopied
    // 调用 db.query() 执行删除文章分类的 SQL 语句：
    db.query(sql, req.params.id, (err, results) => {
      // 执行 SQL 语句失败
      if (err) return res.cc(err)
    
      // SQL 语句执行成功，但是影响行数不等于 1
      if (results.affectedRows !== 1) return res.cc('删除文章分类失败！')
    
      // 删除文章分类成功
      res.cc('删除文章分类成功！', 0)
    })
  }
const getArtCateById = (req, res) => {
    const artByIdSql = `select * from ev_article_cate where id=?`

    db.query(artByIdSql, req.params.id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
      
        // SQL 语句执行成功，但是没有查询到任何数据
        if (results.length !== 1) return res.cc('获取文章分类数据失败！')
      
        // 把数据响应给客户端
        res.send({
          status: 0,
          message: '获取文章分类数据成功！',
          data: results[0],
        })
      })

    }
  
const updateCateById = (req, res)=>{
    const sql = `select * from ev_article_cate where Id<>? and (name=? or alias=?)`
    // 执行查重操作
db.query(sql, [req.body.Id, req.body.name, req.body.alias], (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
  
    // 分类名称 和 分类别名 都被占用
    if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！')
    if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称与别名被占用，请更换后重试！')
    // 分类名称 或 分类别名 被占用
    if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！')
    if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！')
  
    // TODO：更新文章分类
    const updateSql = `update ev_article_cate set ? where Id=?`
    db.query(updateSql, [req.body, req.body.Id], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
      
        // SQL 语句执行成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('更新文章分类失败！')
      
        // 更新文章分类成功
        res.cc('更新文章分类成功！', 0)
      })
  
  })
}
module.exports = {
    getArtcateList,
    addArtcateType,
    deleteCateById,
    getArtCateById,
    updateCateById
}