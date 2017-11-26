const router = require('koa-router')();
const UserController=require('../controllers/User')

router.prefix('/api/users')

router.post('/login',UserController.login)

module.exports = router
