import prisma from "../lib/prismaClient.js";
import bcrypt from 'bcryptjs'
import { generateToken } from "../lib/utils.js";

export const signup = async (req,res)=>{
    try{
        const {email,password,fullName} = req.body
        const user = await prisma.user.findUnique({
            where:{email}
        })
        if(user)
            return res.json({message:"user already exists"})

        const hashedPassword = await bcrypt.hash(password,10)

        const newUser = await prisma.user.create({
            data:{
                fullName,
                email,
                password:hashedPassword
            }
        }) 

        if(newUser){
            //generate token
            generateToken(newUser.id,res)
            res.status(201).json({
                id:newUser.id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic
            })
        }
        else{
            res.json({
                message:"invalid user data"
            })
        }
    }
    catch(error){
        console.log("error in signup",error.message)
        res.json({
            message:"internal server error"
        }).status(500)

    }
}
export const login = (res,req)=>{
    res.json("Signup")
}
export const logout = (res,req)=>{
    res.json("Signup")
} 