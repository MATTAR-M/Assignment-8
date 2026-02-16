import { Router } from "express";
import * as US from "./user.service.js"
import { authentication } from "../../common/middleware/authentication.js";

const userRouter = Router()
userRouter.post('/signup',US.signup)
userRouter.get('/signin',US.userLogin)
userRouter.patch('/update',authentication,US.updateuser)
userRouter.delete('/delete',authentication,US.deleteuser)
userRouter.get('/',authentication,US.getuser)

export default userRouter