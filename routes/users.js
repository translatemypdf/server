const router = require('express').Router()
const UserController = require('../controllers/userController')

router.get('/', UserController.findAllUser)
router.post('/register', UserController.register)
router.post('/login', UserController.login)

module.exports = router