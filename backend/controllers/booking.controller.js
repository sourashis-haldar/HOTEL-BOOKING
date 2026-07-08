import Booking from "../models/booking.model.js";
import Room from "../models/room.model.js";
import Hotel from '../models/Hotel.model.js'
import User from '../models/User.model.js'
import sendMail from "../utils/sendMail.js";


const checkAvailability = async ({ checkInDate, checkOutDate, room }) => {
  try {
    const bookings = await Booking.find({
      room, checkInDate: { $lte: checkOutDate },
      checkOutDate: { $gte: checkInDate }
    });
    const isAvailabe = bookings.length == 0
    return isAvailabe;
  } catch (error) {
    console.log(error.message)
  }
}


export const checkAvailabilityAPI = async (req, res) => {
  try {
    const { checkInDate, checkOutDate, room } = req.body;
    const isAvailabe = await checkAvailability({ checkInDate, checkOutDate, room });
    return res.json({
      success: true,
      isAvailabe
    })
  } catch (error) {
    return res.json({
      success: false,
      message: error.message
    })
  }

}

//api to create booking
export const createBooking = async (req, res) => {
  try {
    const { checkInDate, checkOutDate, room, guests } = req.body;
    const isAvailabe = await checkAvailability({ checkInDate, checkOutDate, room });
    const user = req.user._id;
    if (!isAvailabe) {
      return res.json({
        success: false,
        message: "room is not available"
      })
    }
    //get totalprice frpm room
const roomData=await Room.findById(room).populate("hotel");
    let totalPrice =roomData.pricePerNight;
// calculate total price basd on night
const checkin=new Date(checkInDate);
const checkout=new Date(checkOutDate);
const timediff=checkout.getTime()-checkin.getTime();
const nights=Math.ceil(timediff/(1000*3600*24));
    totalPrice *=nights;
const booking=await Booking.create({
  user,
  room,
  hotel:roomData.hotel._id,
  guests:+guests,
  checkInDate,
  checkOutDate,
  totalPrice
})

    const hoteldetails = await Hotel.findById(roomData.hotel._id);
    console.log(hoteldetails)
const mailoptions={
  to:req.user.email,
  subject:"Hotel Booking Details",
  html:`
  <h2>Your Booking Detils</h2>
  <p>Dear ${req.user.username},</p>
  <p>Thank You for your booking ! Here are your details</p>
  <ul>
  <li>
  <strong>Hotel Name: </strong>${hoteldetails.name}
  </li>
<li>
  <strong>Location: </strong>${hoteldetails.address}
  </li>
  <li>
  <strong>CheckIn Date: </strong>${new Date(booking.checkInDate).toLocaleDateString()}
  </li>
  <li>
  <strong>CheckOut Date: </strong>${new Date(booking.checkOutDate).toLocaleDateString() }
  </li>
  <li>
  <strong>Booking Amount </strong>${booking.totalPrice}
  </li>
  </ul>
  `
}
await sendMail(mailoptions);


return res.json({
  success:true,
  message:"Booking created successfully"
})
  } catch (error) {
return res.json({
  succes:false,
  message:error.message
})
  }
}

//api to get all booking for a user

export const getuserbookings=async (req,res)=>{
  try {
    const user=req.user._id;
    const bookings=await Booking.find({user}).populate("room hotel").sort({createdAt:-1})

    return res.json({
      succes:true,
      bookings
    })
  } catch (error) {
    return res.json({
      succes:false,
      message:error.message
    })
  }
}


//get hotelbookings for owner

export const getHotelBookings=async (req,res)=>{
  try {
    const hotelData=await Hotel.findOne({owner:req.user._id})
    if(!hotelData){
      return res.json({
        success:false,
        message:"no hotel found"
      })
    }
    const bookings = await Booking.find({ hotel: hotelData._id }).populate("room hotel user").sort({ createdAt: -1 })
// Total Revenue
const totaleRevenue=bookings.reduce((acc,booking)=>acc+booking.totalPrice,0);
const totalbooking=bookings.length;
return res.json({
  success:true,
 
  Dashboarddata:{
    totalbooking,
    totaleRevenue,
    bookings
  }
})

  } catch (error) {
    return res.json({
      sucess:false,
      message:"Booking not succesfull fetch"
    })
  }
}



//delete bookings

export const cancelBookings=async(req,res)=>{

try {
  const {bookingid}=req.params;
  const booking=await Booking.findById(bookingid);
  if(!booking){
    return res.status(400).json({
      success:false,
      message:"Booking Not Found"
    })
  }
  await Booking.findByIdAndDelete(bookingid);
  return res.status(200).json({
success:true,
message:"Booking Cancel Succefully"
  })
  
} catch (error) {
  return res.status(500).json({
    success:false,
    message:error
  })
}

}