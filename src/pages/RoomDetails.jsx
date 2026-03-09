import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets, facilityIcons, roomsDummyData } from "../assets/assets";

function RoomDetails() {
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

  const { id } = useParams();
  const [room, setroom] = useState(null);
  const [mainImage, setmainImage] = useState(null);
  useEffect(() => {
    const room = roomsDummyData.find((room) => {
      return room._id === id;
    });
    room && setroom(room);
    room && setmainImage(room.images[0]);
  }, [room]);
  return (
    room && (
      <div className="py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32">
        {/* Room Details   */}

        <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
          <h1 className="text-3xl md:text-4xl font-playfair">
            {room.hotel.name}{" "}
            <span className="font-inter text-sm">({room.roomType})</span>
          </h1>
          <p className="text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full">
            20% off
          </p>
        </div>

        {/* Room Rating */}
        <div className="flex items-center gap-1 mt-2">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <Star key={index} filled={4 > index} />
            ))}
          <p className="ml-2">200+ reviews</p>
        </div>

        {/* Room Adress */}
        <div className="flex items-center gap-1 text-gray-500 mt-2">
          <img src={assets.locationIcon} alt="location-icon" />
          <span>{room.hotel.address}</span>
        </div>

        {/* Room images */}

        <div className="flex flex-col lg:flex-row mt-6 gap-6">
          <div className="lg:w-1/2 w-full">
            <img
              src={mainImage}
              alt="room-image"
              className="w-full rounded-xl shadow-lg object-cover"
            />
          </div>
          <div className="grid grid-cols-2 lg:w-1/2 gap-4 w-full">
            {room.images.length > 1 &&
              room.images.map((image, index) => (
                <img
                  onClick={() => setmainImage(image)}
                  key={index}
                  src={image}
                  alt="room image"
                  className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${mainImage == image && "outline-3 outline-orange-500"}`}
                />
              ))}
          </div>
        </div>

        {/* Room Highlight */}

        <div className="flex flex-col md:flex-row md:justify-between mt-10">
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-playfair">
              Experience Luxury Like Never Before
            </h1>
                      <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">{room.amenities.map((item,index) => (
                          <div key={index} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100">
                              <img src={facilityIcons[item]} alt={item} className="w-5 h-5" />
                              <p className="text-xs">{ item}</p>
                          </div>
                          
            ))}</div>
                  </div>
                  {/* Room Price */}
                  <p className="text-2xl font-medium">${ room.pricePerNight}/night</p>
              </div>
              

              {/* Check in form */}

              <form action="">
                  
                  
              </form>
      </div>
    )
  );
}

export default RoomDetails;
