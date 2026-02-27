import {create} from 'zustand'
import { axiosInstance } from '../lib/axios';

export const useAuthStore = create((set)=>({
    authUser:null,
    isSigningUp: false,
    isLogginIn:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,

    checkAuth: async()=>{
        try {
            const res = await axiosInstance.get("/auth/check");
            
            set({authUser:res.data})

        } catch (error) {
            console.log("Error in CheckAuthStore : ",error.response?.data || error.message)
        }
        finally{
            set({isCheckingAuth:false})
        }
    }

}));