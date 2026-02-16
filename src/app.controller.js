import express from'express'
import chechConnection from './DB/conncectionDB.js'
import userModel from './DB/models/user.model.js'
import noteModel from './DB/models/notes.model.js'
import userRouter from './mods/users/user.controller.js'
const app = express()
const port = 3000


const bootstrap = async()=>{
    app.use(express.json())
    chechConnection()
    userModel
    noteModel
    app.use('/users',userRouter)
    app.get('/', (req, res) => res.send('Hello World!'))
    app.use("{/*demo}",(req,res,next)=>{
        throw new Error(`the URL ${req.originalUrl} not found`,{cause:404})
    })
    app.use((err,req,res,next)=>{
        res.status(err.cause||500).json({message:err.message,stack:err.stack})
    })
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))

}



export default bootstrap