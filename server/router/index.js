const router = require('express').Router()
const userRouter = require('./user') // Fix the casing of the import
const movieRouter = require('./movie')



router.use('/user',userRouter)
router.use('/movie', movieRouter)

module.exports = router