import mongoose from "mongoose";



const chechConnection = async ()=>{
    await mongoose.connect("mongodb://localhost:27017/Assignment8",{serverSelectionTimeoutMS:6000})
    .then(()=>{
        console.log("DB connection established🫡  🫡");
    })
    .catch((error)=>{
        console.log("connection failed🤷‍♂️  🤷‍♂️",error);
    })
}


export default chechConnection