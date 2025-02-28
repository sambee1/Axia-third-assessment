const mongoose = require('mongoose')


const mongoDbConnection = async (req, res) =>{
    
    try {
        await mongoose.connect(process.env.MONGODB)
    } catch (error) {
        console.log(error)
    }
    console.log('Connected to DB')
}

module.exports = mongoDbConnection