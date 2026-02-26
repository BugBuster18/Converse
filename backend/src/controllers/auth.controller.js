import prisma from "../lib/prismaClient.js";
import bcrypt from 'bcryptjs'
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

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
export const login = async (req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await prisma.user.findUnique({
            where:{email}
        })

        if(!user){
            return res.status(400).json({
                message:"invalid credentials"
            })
        }
        else{
            console.log(user)
            const isPasswordCorrect = await bcrypt.compare(password,user.password)
            if(!isPasswordCorrect){
                 return res.status(400).json({
                message:"invalid credentials"
            })
            }
            generateToken(user.id,res)
            res.status(200).json({
                id:user.id,
                fullName:user.fullName,
                email:user.email,
                profilePic:user.profilePic
            })
        }

    } catch (error) {
        console.log("error in login",error.message)
        res.status(500).json({
            message:"internal server error at login"
        })
    }
}
export const logout = (req,res)=>{
   try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({
            message:"Logout successfully"
        })
    
   } catch (error) {
      console.log("error in logout",error.message)
        res.json({
            message:"internal server error"
        }).status(500)
   }
} 
export const updateProfile= async (req,res)=>{
    try {
        const {profilePic} = req.body
        const userId = req.user.id; ;
        
        if(!profilePic){
           return res.status(400).json({
            message:"profile pic not provided"
           })
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic)

        const updatedUser = await prisma.user.update({where:{userId}, data:{profilePic:uploadResponse.secure_url}})

        res.status(200).json(updatedUser)

    } catch (error) {
        console.log("error in updating profile",error.message)
        res.json({
            message:"internal server error"
        }).status(500)
    }
}

export const checkAuth = (req,res)=>{
    try {
        res.status(200).json(req.user)
        
    } catch (error) {
        console.log("error in checkAuth controller",error.message)
        res.json({
            message:"internal server error"
        }).status(500)
    }
}