import React, { useState } from 'react'
import { assets, facilityIcons, roomsDummyData } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const CheckBox = ({label,selected=false,onChange=()=>{}}) => {
  return (
    <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
      <input type="checkbox" checked={selected} onChange={(e) => onChange(e.target.checked, label)} />
      <span className='font-light select-none'>{ label}</span>
    </label>
  )
}


const RadioButton = ({ label,selected=false, onChange = () => {} }) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
      <input
        type="radio"
        name='sortOptions'
        checked={selected}
        onChange={() => onChange( label)}
      />
      <span className="font-light select-none">{label}</span>
    </label>
  );
};





function AllRooms() {
  const naviagte = useNavigate();
  const [openfilter, setopenfilter] = useState(false);
  const roomTypes = [
    "Singel Bed",
    "Double Bed",
    "Luxary Room",
    "Family Suite"
  ]

  const priceRanges = [
    "0 to 500",
    "500 to 1000",
    "1000 to 2000",
    "2000 to 3000"
  ]



  const sortOptions = [
    "Price Low to High",
    "Price High to Low",
    "Newest First"
]

 const Star = ({ filled }) => (
   <svg
     className="w-4 h-4 text-yellow-400"
     fill={filled ? "currentColor" : "none"}
     stroke="currentColor"
     strokeWidth="1.5"
     viewBox="0 0 24 24"
   >
     <path
       strokeLinecap="round"
       strokeLinejoin="round"
       d="M12 17.25l-6.16 3.73 1.64-7.03L2.5 9.77l7.19-.61L12 2.5l2.31 6.66 7.19.61-5 4.18 1.64 7.03z"
     />
   </svg>
 );


  return (
    <div className="flex flex-col-reverse lg:flex-row items-start justify-between pt-25 md:pt-35 px-4 md:px-16 lg:px-24">
      <div>
        <div className="flex flex-col items-start text-left">
          <h1 className="font-playfair text-4xl md:text-[40px]">Hotel Rooms</h1>
          <p className="text-sm md:text-base text-gray-500/90 mt-2">
            Take advantage of our limited-time offers and special packages to
            enhance your stay and create unforgettable memories.
          </p>
        </div>

        {roomsDummyData.map((room) => {
          return (
            <div
              key={room._id}
              className="flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:pb-30 last:border-0"
            >
              <img
                src={room.images[0]}
                alt="room-image"
                title="View Room Details"
                className="max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer"
                onClick={() => {
                  naviagte(`/rooms/${room._id}`);
                  scrollTo(0, 0);
                }}
              />
              <div className="md:w-1/2 flex flex-col gap-2">
                <p className="text-gray-500">{room.hotel.city}</p>
                <p
                  className="text-gray-800 text-3xl font-playfair cursor-pointer"
                  onClick={() => {
                    naviagte(`/rooms/${room._id}`);
                    scrollTo(0, 0);
                  }}
                >
                  {room.hotel.name}
                </p>
                <div className="flex items-center">
                  {Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <Star key={index} filled={4 > index} />
                    ))}
                  <p className="ml-2">200+ reviews</p>
                </div>
                <div className="flext items-center gap-1 text-gray-500 mt-2 text-sm">
                  <img src={assets.locationIcon} alt="location-icom" />
                  <span>{room.hotel.address}</span>
                </div>
                <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
                  {room.amenities.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]"
                    >
                      <img
                        src={facilityIcons[item]}
                        alt={item}
                        className="w-5 h-5"
                      />
                      <p className="text-xs">{item}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xl text-gray-700 font-medium">
                  $ {room.pricePerNight} /day
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="bg-white w-80 border  border-gray-300 text-gray-600 max-lg:md-8 lg:mt-16">
        {/*  Filters */}

        <div
          className={`flex items-center justify-between px-5 py-2.5 lg:border-b border-gary-300 ${openfilter && "border-b"}`}
        >
          <p className="text-base font-medium text-gray-800">FILTERS</p>
          <div className="text-xs cursor-pointer">
            <span
              onClick={() => {
                setopenfilter(!openfilter);
              }}
              className="lg:hidden"
            >
              {openfilter ? "HIDE" : "SHOW"}
            </span>
            <span className="hidden lg:block">CLEAR</span>
          </div>
        </div>
        <div
          className={`${openfilter ? "h-auto" : "h-0 lg:h-auto"} overflow-hidden transition-all duration-700`}
        >
          <div className="px-5 pt-5">
            <p className="font-medium text-gray-800">Popular filters</p>
            {roomTypes.map((room, index) => (
              <CheckBox key={index} label={room} />
            ))}
          </div>
          <div className="px-5 pt-5">
            <p className="font-medium text-gray-800">Price Range</p>
            {priceRanges.map((range, index) => (
              <CheckBox key={index} label={`$ ${range}`} />
            ))}
          </div>
          <div className="px-5 pt-5 pb-7">
            <p className="font-medium text-gray-800">Sort By</p>
            {sortOptions.map((option, index) => (
              <RadioButton key={index} label={option} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllRooms;