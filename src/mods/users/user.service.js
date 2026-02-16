import * as DBS from "../../DB/DB.service.js";
import userModel from "../../DB/models/user.model.js";
import { successRespones } from "../../common/utils/res.succ.js";
import { encrypt } from "../../common/utils/sercruity/encrypt.secu.js";
import { Compare, Hash } from "../../common/utils/sercruity/hash.security.js";
import { generateToken ,verifyToken} from "../../common/utils/token.service.js";
import { v4 as uuidv4 } from "uuid";

export const signup = async (req, res, next) => {
  const { name, email, password, phone, age } = req.body;
  if (await DBS.findone({ model: userModel, filter: { email } })) {
    throw new Error("user already exist", { cause: 402 });
  }
  const user = await DBS.create({
    model: userModel,
    data: {
      name,
      email,
      password: Hash({ plainText: password }),
      phone: encrypt(phone),
      age,
    },
  });
  successRespones({ res, status: 201, data: user });
};

export const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await DBS.findone({ model: userModel, filter: { email } });
  if (!user || !Compare({ plainText: password, cipherText: user.password })) {
    throw new Error("inValid email or password", { cause: 402 });
  }
  const accessToken = generateToken({
    payload: { id: user._id },
    secritKey: "Doaa",
    options: {
      expiresIn: "1h",
      jwtid: uuidv4(),
    },
  });
  successRespones({ res, message: "Successful Log in", data: { accessToken } });
};

export const updateuser = async (req, res, next) => {
    const { name, email, age, phone } = req.body;
    const id = req.user; 
    if (email) {
        const unavailableEmails = await DBS.findone({
            model: userModel,
            filter: { email: email, _id: { $ne: id } }, 
        });

        if (unavailableEmails) {
            throw new Error("Email already exists", { cause: 409 });
        }
    }
    const user = await DBS.updateUser({
        model: userModel,
        id: id,
        data: { 
            name, 
            email, 
            age, 
            phone: phone ? encrypt(phone) : undefined 
        },
    });

    if (!user) {
        throw new Error("User does not exist", { cause: 404 });
    }

    successRespones({ res, message: "User updated", data: user });
};


export const deleteuser = async (req,res,next)=>{
    const {id} = req.user
    const user = await DBS.deleteUser({model:userModel,id:id})
    if (!user) {
        return next(new Error("User not found", { cause: 404 }));
    }
successRespones({res,status:200,message:"user deleted",data:user})
}

export const getuser = async (req, res, next) => {
    const id = req.user; 
        const user = await DBS.findone({
            model: userModel,
             id: id 
            });

    if (!user) {
        throw new Error("User does not exist", { cause: 404 });
    }

    successRespones({ res, data: user });
};
