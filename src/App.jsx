import { useState } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home';
import Footer from './components/Footer';
import AllRooms from './pages/AllRooms';
import RoomDetails from './pages/RoomDetails';
import Mybookings from './components/Mybookings';
import HotelReg from './components/HotelReg';
import Layout from './pages/hotelOwner/Layout';


function App() {
  const isOwnerpath = useLocation().pathname.includes('owner');

  return (
    <div>
      {!isOwnerpath && <Navbar />}
      {false && <HotelReg />}

      <div className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<AllRooms />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/my-bookings" element={<Mybookings />} />
          <Route path='/owner' element={<Layout />}>
            
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App
