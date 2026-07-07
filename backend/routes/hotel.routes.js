import express from 'express'
import { registerHotel } from '../controllers/hotel.controller.js';
import { protect } from '../middlewares/authMiddlewares.js';
const hotelRoutes=express.Router();

hotelRoutes.post('/register-hotel',protect,registerHotel)


export default hotelRoutes;