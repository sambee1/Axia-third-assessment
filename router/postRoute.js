const {Router} = require('express')
const {register, userLogin, deleteUser} = require('../controller/userController')
const authMiddleware = require('../middleware/tokenMiddleware')



const router = Router()

.post('/post', register)


module.exports = router