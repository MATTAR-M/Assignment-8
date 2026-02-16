import mongoose from "mongoose";



const noteShema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        validate:{
            validator :function(value){
                return value !== value.toUpperCase()
            },
            message:"Title cannot be entirely uppercase"
        }
    },
    content:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    } 
},{
timestamps:true
})



const noteModel =  mongoose.models.note || mongoose.model("note",noteShema)
export default noteModel