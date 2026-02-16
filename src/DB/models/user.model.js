import mongoose from "mongoose";



const userShema = new mongoose.Schema({
    name : {
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        max:60,
        min:18
    }
},{
    timestamps:true,
    // strictQuery:true
})
const userModel = mongoose.models.user || mongoose.model("user",userShema)

export default userModel