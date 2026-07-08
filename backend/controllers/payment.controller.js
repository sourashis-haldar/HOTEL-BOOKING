import razorpay from "../configs/razorpay.js";
import crypto from "crypto";
import Booking from "../models/booking.model.js";

export const createorder=async(req,res)=>{
try {
  const { orderamount, bookingId } = req.body;
  if(!orderamount){
    return res.status(400).json({
      success:false,
      message:"Order Amount are required"
    })
  }
  const options = { 
    amount: orderamount * 100,
    currency: "INR",
    receipt: bookingId
  }
  const order = await razorpay.orders.create(options);
  return res.status(200).json({
    success: true,
    order
  })
} catch (error) {
  return res.status(500).json({
    success:false,
    message:"order creation error",error
  })
}
}





export const verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    bookingId
  } = req.body;
  const body =
    razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
const book=await  Booking.findByIdAndUpdate(bookingId,{
  ispaid:true,
  paymentMethod:"Online Payment",
  status:"confirmed"
})

    return res.json({
      success: true
    })

  }

  return res.status(400).json({
    success: false
  })

}