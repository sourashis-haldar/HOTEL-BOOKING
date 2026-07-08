import express from 'express'
import 'dotenv/config'
import { clerkMiddleware } from '@clerk/express'
import cors from 'cors'
import ConectDB from './db/db.js';
import webhooksRouter from './routes/webhooks.routes.js';
import userroutes from './routes/user.routes.js';
import hotelRoutes from './routes/hotel.routes.js';
import connectCloudinary from './configs/cloudniary.js';
import roomrouter from './routes/rooom.routes.js';
import bookingRouter from './routes/booking.routes.js';
import paymentRouter from './routes/payment.routes.js';

const app=express();
await ConectDB();
connectCloudinary();
app.use(cors());
app.use(express.json());

app.use(clerkMiddleware())






app.use("/api/webhooks",webhooksRouter);
app.use("/api/user",userroutes);
app.use("/api/hotels",hotelRoutes);
app.use("/api/rooms",roomrouter);
app.use("/api/bookings",bookingRouter)
app.use("/api/payment",paymentRouter);

app.get('/', (req, res) => {
  res.send('hiiii serverr.....')
})
export default app;
