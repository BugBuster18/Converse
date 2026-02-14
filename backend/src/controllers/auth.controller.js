import prisma from "../lib/prismaClient";

export const signup = (res,req)=>{
    const {fullName,email,password} = req.body;


    res.json("Signup")
}
export const login = (res,req)=>{
    res.json("Signup")
}
export const logout = (res,req)=>{
    res.json("Signup")
} 