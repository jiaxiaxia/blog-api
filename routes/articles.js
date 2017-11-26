const router = require('koa-router')()
const Article = require('../controllers/Article')

router.prefix('/api/articles')

router.post('/', Article.create)
router.get('/list', Article.getList)
router.get('/list/:id', Article.getDetail)

module.exports = router
