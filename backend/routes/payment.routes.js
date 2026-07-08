import express  from 'express'
import { createorder, verifyPayment } from "../controllers/payment.controller.js";
import { protect } from '../middlewares/authMiddlewares.js';

const paymentRouter=express.Router();


paymentRouter.post('/create-payment',createorder);
paymentRouter.post('/verify',verifyPayment);

export default paymentRouter;


