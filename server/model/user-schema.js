import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    username: {
        type:String,
        required:true,
        unique:true
    },
    password :{
        type:String,
        required:true
    },
    favorite :{
        type:[String],
        required:false
    },
    watchlater:{
        type:[String],
        required:false
    }
})

const user = mongoose.model('user', userSchema);
export default user;