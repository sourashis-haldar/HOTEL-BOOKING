import { cancelBookings, checkAvailabilityAPI, createBooking, getHotelBookings, getuserbookings } from "../controllers/booking.controller.js";
import { protect } from "../middlewares/authMiddlewares.js";
import express from 'express'

const bookingRouter=express.Router();

bookingRouter.post('/cheeck-avalibality',checkAvailabilityAPI);
bookingRouter.post("/crete-booking",protect,createBooking);
bookingRouter.get("/user",protect,getuserbookings);
bookingRouter.get("/hotel",protect,getHotelBookings);
bookingRouter.delete('/cancel-bookings/:bookingid',protect,cancelBookings);
export default bookingRouter;
