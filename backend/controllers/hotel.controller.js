import Hotel from "../models/Hotel.model.js";
import User from "../models/User.model.js";

export const registerHotel=async(req,res)=>{
  try {
    const { name, address, contact, city } = req.body;
    const owner = req.user._id;
    const hotel = await Hotel.findOne({ owner })
    if (hotel) {
      return res.json({
        success: false,
        message: "Hotel Already register"
      })
    }
    await Hotel.create({ name, address, contact, city, owner })

    await User.findByIdAndUpdate(owner, { role: "hotelOwner" })
    return res.json({
      success:true,
      message:"Hotel add succesfully"
    })
  } catch (error) {
    res.json({
      success:false,
      message:error.message
    })
  }
  
}