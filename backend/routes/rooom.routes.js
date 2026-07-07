import express from 'express'
import { protect } from '../middlewares/authMiddlewares.js';
import { createRoom, getroom } from '../controllers/room.controller.js';
import { getRooms } from '../controllers/room.controller.js';
import { getOwnersRooms } from '../controllers/room.controller.js';
import { toggleRoomsavality } from '../controllers/room.controller.js';
import upload from '../middlewares/uploadMiddleware.js';

const roomrouter=express.Router();

roomrouter.get("/",getRooms);
roomrouter.get('/single-room/:id',getroom);
roomrouter.get("/owners-room",protect,getOwnersRooms);
roomrouter.post('/toogle-availabilty',protect,toggleRoomsavality);
roomrouter.post('/uploads',upload.array("images",4),protect,createRoom)


export default roomrouter;