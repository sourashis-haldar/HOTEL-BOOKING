import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser ,useAuth} from '@clerk/clerk-react';
import toast from 'react-hot-toast';
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const Appcontext=createContext();


export const AppProvider=({children})=>{

const currency = import.meta.env.VITE_CURRENCY || "$"

const navigate=useNavigate();
const {user}=useUser();
const {getToken}=useAuth();
const [isowner,setisowner]=useState(false);
const [showHotelReg,setShowHotelReg]=useState(false)
const [searchedCitis,setSearchCities]=useState([])
const [rooms,setrooms]=useState([]);

const fetchRooms=async()=>{
  const {data}=await axios.get('/api/rooms');
  if (data.success){
setrooms(data.rooms)
  } 
}

const fetchUser=async ()=>{
   let token= await getToken()
  console.log(token)
  
try {
  const {data}=await axios.get('/api/user',{
    headers:{
      Authorization: `Bearer ${await getToken()}`
    }
  })
  if (data.sucsess) {
    setisowner(data.role == "hotelOwner");
    setSearchCities(data.recentSearchedCities);
  } else {
    setTimeout(() => {
      fetchUser();
    }, 5000);
  }
} catch (error) {
  toast.error(error.message)
}
}


useEffect(()=>{
if(user){
  fetchUser();
}
},[user])
useEffect(() => {
  fetchRooms();
}, []);


  const value={
currency,user,navigate,getToken,isowner,setisowner,showHotelReg,setShowHotelReg,axios,setSearchCities,searchedCitis,rooms,setrooms
  }
return (
  <Appcontext.Provider value={value}>
    {children}
  </Appcontext.Provider>
)
}

export const useAppContext=()=>useContext(Appcontext);