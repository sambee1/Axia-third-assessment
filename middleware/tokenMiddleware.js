const jwt = require('jsonwebtoken')
const userModel = require('../model/userModel')

const authMiddleware = async(req, res, next) =>{
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({message: "You must login to continue"})
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        if(!verified) res.json({message: 'Invalid Token'}).status(404)

            
            const user = await userModel.findById(verified.id).select("-password")
            if(!user){
                res.json({message: "User not found"}).status(404)
            }
            req.user = user
            next()
    } catch (error) {
        console.log(error)
    }
}

module.exports = authMiddleware