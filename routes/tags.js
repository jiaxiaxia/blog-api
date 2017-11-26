const router = require('koa-router')()
const Tag=require('../controllers/Tag')


router.post('/tags',Tag.create)
router.get('/tags',Tag.getList)

module.exports = router
