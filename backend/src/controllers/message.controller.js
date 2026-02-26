import cloudinary from "../lib/cloudinary.js";
import prisma from "../lib/prismaClient.js";

export const getUsersForSidebar = async (req,res) =>{
    try {
        const loggedInUser = req.user.id;
        const filteredUsers = await prisma.user.findMany({
            where:{
                NOT:{
                    id:loggedInUser
                }
            },
               select: {
                    id: true,
                    email: true,
                    fullName: true,
                    profilePic: true,
                    createdAt: true,
                }
        })

        res.status(200).json(filteredUsers)
    } catch (error) {
         console.log("error in getUserForSidebar controller",error.message)
        res.json({
            message:"internal server error"
        }).status(500)
    }
}

export const getMessages = async(req,res)=>{
    try {
        const {id:userToChatId} = req.params;
        const myId = req.user.id

        const messages = await prisma.message.findMany({
            where:{
                OR:[
                    {
                        senderId:myId,
                        receiverId:userToChatId
                    },
                    {
                        senderId:userToChatId,
                        receiverId:myId
                    }
                ]
            }
        })
        res.status(200).json(messages)

    } catch (error) {
         console.log("error in getmessages controller",error.message)
        res.json({
            message:"internal server error"
        }).status(500)
    }
}

export const sendMessage = async(req,res)=>{
    try {
        const{text,image} = req.body;
        const{id:receiverId} = req.params;
        const senderId = req.user.id;

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = await prisma.message.create({
            data:{
                senderId,
                receiverId,
                text,
                image:imageUrl
            }
        })
        //socket.io implementaion

        res.status(201).json(newMessage)

    } catch (error) {
         console.log("error in sendMessage controller",error.message)
        res.json({
            message:"internal server error"
        }).status(500)
    }   
}