import Room from "../models/room.model.js";
import Hotel from '../models/Hotel.model.js'
import { v2 as cloudinary } from 'cloudinary'
import streamifier from "streamifier";
import fs from 'fs'

//create room api
export const createRoom=async(req,res)=>{
  try {
    const { roomType, pricePerNight, amenities }=req.body;
    const hotel=await Hotel.findOne({owner:req.user._id})
    if(!hotel){
      return res.json({
        succes:false,
        message:"No hotel found"
      })
    }
    if(req.files.length<4){
      return res.json({
        success:false,
        message:"Plese upload all images"
      })
    }
    const uploadToCloudinary = (file) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "hotel-booking", // optional
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          }
        );

        streamifier.createReadStream(file.buffer).pipe(stream);
      });
    };

    const uploadImages = await Promise.all(
      req.files.map((file) => uploadToCloudinary(file))
    );
const images= await Promise.all(uploadImages)
await Room.create({
  hotel:hotel._id,
  roomType,
  pricePerNight:+pricePerNight,
  amenities:JSON.parse(amenities),
  images
})
return res.json({
  success:true,
  message:"room create succesfully"
})
  } catch (error) {
    return res.json({
      succes:false,
      message:error.message
    })
  }
}


// get all rooms 
export const getRooms=async(req,res)=>{
try {
  const rooms= await Room.find({isAvailable:true}).populate({
    path:"hotel",
    populate:{
      path:"owner",
select:"image"
    }
    
  }).sort({createdAt:-1})
  


  return res.json({
    success:true,
    message:"room fetch succesfully",
    rooms:rooms
  })

} catch (error) {
  return res.josn({
    succes:false,
    message:error.message
  })
}
}

export const getroom=async(req,res)=>{
  try {
    const { id } = req.params;
    const room = await Room.findById(id).populate("hotel")
    if (room) {
      return res.json({
        succes: true,
        room
      })
    } 
    return res.json({
      succes:false,
      message:"room not found"
    })
  } catch (error) {
    return  res.json({
      succes:false,
      message:error.message

    })
  }
  
}


export const getOwnersRooms=async(req,res)=>{
  try {
    const hoteldata=await Hotel.findOne({owner:req.user._id})
    const OwnerRooms=await Room.find({hotel:hoteldata._id}).populate("hotel");
    return res.json({
      success:true,
      OwnerRooms
    })
  } catch (error) {
    return res.json({
      success:false,
      message:error.message
    })
  }
}


export const toggleRoomsavality=async(req,res)=>{
  try {
    const {roomId}=req.body;
    const roomData=await Room.findById(roomId);
    roomData.isAvailable=!roomData.isAvailable;
    await roomData.save();
    return res.json({
      success:true,
      message:"Room avaliability updated"
    })
    } catch (error) {
    return res.json({
      success:false,
      message:error.message
    })
  }
}