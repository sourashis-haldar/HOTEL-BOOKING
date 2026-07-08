
import Navbar from './components/Navbar'
import { Route, Router, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home';
import Footer from './components/Footer';
import AllRooms from './pages/AllRooms';
import RoomDetails from './pages/RoomDetails';
import Mybookings from './components/Mybookings';
import HotelReg from './components/HotelReg';
import Layout from './pages/hotelOwner/Layout';
import Dashboard from './pages/hotelOwner/Dashboard';
import AddRoom from './pages/hotelOwner/AddRoom';
import ListRoom from './pages/hotelOwner/ListRoom';
import toast, { Toaster } from "react-hot-toast";
import { useAppContext } from './context/AppContext';
import Dashboard_protect from './protected_routes/Dashboard_protect';

function App() {
  const isOwnerpath = useLocation().pathname.includes('owner');
const { showHotelReg } = useAppContext();
  return (
    <div>
      <Toaster />
      {!isOwnerpath && <Navbar />}

      {showHotelReg && <HotelReg />}
      <div className="min-h-[70vh] overflow-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<AllRooms />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/my-bookings" element={<Mybookings />} />
          <Route path="/owner" element={<Layout />}>
            <Route
              index
              element={
                <Dashboard_protect>
                  <Dashboard />
                </Dashboard_protect>
              }
            />
            <Route path="add-room" element={<AddRoom />} />
            <Route path="list-room" element={<ListRoom />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App
