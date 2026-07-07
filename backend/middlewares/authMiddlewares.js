import { getAuth } from "@clerk/express";
import User from "../models/User.model.js";

export const protect=async(req,res,next)=>{
  
  const { userId } = getAuth(req)
if(!userId){
  return res.json({
    success:false,
    message:"Not Authencatied"
  })
}else{
  const user=await User.findById(userId);
  req.user=user;
  next();
}

}