const router = require('koa-router')()
const Draft = require('../controllers/Draft')

router.post('/drafts', Draft.create)
router.post('/drafts/:postId/publish',Draft.publish)
router.get('/drafts',Draft.getList)
router.get('/drafts/:postId', Draft.get)
router.patch('/drafts/:postId', Draft.patch)
router.delete('/drafts/:postId',Draft.delete)


module.exports = router
