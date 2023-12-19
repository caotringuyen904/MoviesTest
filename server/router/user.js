const router = require('express').Router()
const { deleteUser, createUser, login } = require('../controller/userController')
const authentication = require('../middlewares/authentication')

router.post('/login', login)
router.post('/signup', createUser)
router.delete('/:id',authentication, deleteUser)



module.exports = router