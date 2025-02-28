const mongoose = require('mongoose')

const postModel = new mongoose.Schema({
    postTitle: {
        type: String,
        required:true,
    },
    userPost: {
        type: String,
        required:true,
    },
    noOfPosts: {
        type: Number,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required:true,
    }, 
    
},
{
    timestamps: true
}
)

module.exports = mongoose.model('post', postModel)