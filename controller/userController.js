const tokengenerated = require("../jwt/jwt")
const userModel = require("../model/userModel")
const bcrypt = require('bcryptjs')

const register = async(req, res)=> {
const {username, gmail, password} = req.body
//check if all fields are entered
if(!username || !gmail ||!password){
    return res.json({message: "Enter all input fields to continue"})
}
try {
    const user = await userModel.findOne({gmail})
    if(user) return res.json({message: "User already exists"}).status(409)
    
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)

   const newUser = new userModel({...req.body, password: hashedPassword, kyc:{}})
   await newUser.save()
   res.json({user: newUser})
} catch (error) {
    console.log(error)
}
}

const userLogin = async (req, res) =>{
    const {gmail, password} = req.body
    try {
        const user = await userModel.findOne({gmail})
        if(!user){
            return res.json({mess: "Gmail or password incorrect!!"})
        }
        const comparePass = await bcrypt.compare(password, user.password)

        if(!comparePass){
            res.json({mess:"Gmail or password incorrect!!!"}).status(404)
        }
        const token = tokengenerated(user._id)
        const {password: _, ...userData} = user.toObject()
        console.log(userData)
        res.cookie('token', token, {httpOnly: true, sameSite: "strict"}).status(200).json({user:userData})
        
    } catch (error) {
        console.log(error)
    }
}



const deleteUser = async(req, res) =>{
const paramId = req.params.id
// const tokenId = req.user.id

if (paramId){
    try {
    const users = await userModel.findByIdAndDelete(paramId)
    res.json({message: 'User deleted successfully'}).status(200)
} catch (error) {
    console.log(error)
}
}else{
    return res.json({message: "Access denied"}).status(404)
}

}

const profileUpdate = async(req, res) =>{
    const tokenId = req.user.id  
    const reqId = req.params.id
    const {country, phoneNumber, street, bio} = req.body
    if(tokenId === reqId){
        try{
            await userModel.findByIdAndUpdate(tokenId, {
                $set: {
                    "kyc.country": country,
                    "kyc.phoneNumber": phoneNumber,
                    "kyc.street": street,
                    "kyc.bio": bio,
                }
            }, {new:true})
        } catch(error){
            console.log(error)
        }
    }else{
        console.log("access denied")
    }
}


module.exports = {register, userLogin,  deleteUser, profileUpdate}