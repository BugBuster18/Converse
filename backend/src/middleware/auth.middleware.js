import jwt from 'jsonwebtoken'
import prisma from '../lib/prismaClient'

export const protectRoute = async (req,res,next)=>{
   try {
         const token = req.cookies.jwt;

         if(!token){
            res.status(401).json({
                message:"No token provided"
            })
         }

         const decoded = jwt.verify(token,process.env.JWT_SECRET)

          if(!decoded){
            res.status(401).json({
                message:"invalid token provided"
            })
         }

         const user = await prisma.user.findUnique({
            where:{id:decoded.userId},
            select:{password:false}
         })

         if(!user){
            res.status(401).json({
                message:"user not found"
            })
         }
         req.user = user

         next()
    
   } catch (error) {
        console.log("error in protectRoute middleware",error.message)
        res.json({
            message:"internal server error"
        }).status(500)
   }

}