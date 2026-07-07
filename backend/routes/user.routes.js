import express from 'express'
import { getUserdata } from '../controllers/user.controller.js';
import { protect } from '../middlewares/authMiddlewares.js';
import { storerecentSeachCities } from '../controllers/user.controller.js';
const userroutes=express.Router();

userroutes.get("/",protect,getUserdata);

userroutes.post("/store-recent-search",protect,storerecentSeachCities);
export default userroutes;