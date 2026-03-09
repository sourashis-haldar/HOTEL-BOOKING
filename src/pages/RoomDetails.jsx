import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets, facilityIcons, roomCommonData, roomsDummyData, userDummyData } from "../assets/assets";

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
            <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
              {room.amenities.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100"
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
          </div>
          {/* Room Price */}
          <p className="text-2xl font-medium">${room.pricePerNight}/night</p>
        </div>

        {/* Check in form */}

        <form className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl">
          <div className="flex flex-col flex-wrap md:flex-row items- md:items-center  justify-center gap-4 md:gap-10 text-gray-500">
            <div>
              <div className="flex  items-center gap-2">
                <img src={assets.calenderIcon} className="h-4" alt="" />
                <label htmlFor="checkIn">Check in</label>
              </div>
              <input
                id="checkIn"
                type="date"
                className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
              />
            </div>
            <div className="w-px h-15 bg-gray-300/70 max-md:hidden"></div>
            <div>
              <div className="flex items-center gap-2">
                <img src={assets.calenderIcon} className="h-4" alt="" />
                <label htmlFor="checkOut">Check out</label>
              </div>
              <input
                id="checkOut"
                type="date"
                className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
              />
            </div>
            <div className="w-px h-15 bg-gray-300/70 max-md:hidden"></div>
            <div className="flex md:flex-col max-md:gap-2 max-md:items-center">
              <label htmlFor="guests">Guests</label>
              <input
                min={1}
                max={4}
                id="guests"
                type="number"
                className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none  max-w-16"
                placeholder="0"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-primary hover:bg-primary-dull active:scale-95 transition-all text-white rounded-md max-md:w-full max-md:mt-6 md:px-25 py-3 md:py-4 text-base cursor-pointer"
          >
            Check Avilability
          </button>
        </form>

        {/* Common Specifaction */}
        <div className="mt-25 space-y-4">
          {roomCommonData.map((spec, index) => (
            <div key={index} className="flex items-start gap-2">
              <img src={spec.icon} alt="icon" className="w-6.5" />
              <div>
                <p className="text-base font-semibold">{spec.title}</p>
                <p className="text-gary-500">{spec.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="max-w-5xl border-gray-300 border-y my-15 py-10 text-gray-500">
          <p>
            Guests will be allocated on the ground floor according to
            availability. You get a comfortable Two bedroom apartment has a true
            city feeling. The price quoted is for two guest, at the guest slot
            please mark the number of guests to get the exact price for groups.
            The Guests will be allocated ground floor according to availability.
            You get the comfortable two bedroom apartment that has a true city
            feeling.
          </p>
        </div>
        {/* map */}

        <div class="w-full h-[450px] rounded-xl overflow-hidden shadow">
          <iframe
            className="w-full h-full"
            src="https://www.google.com/maps?q=Sourashis+Room&z=13&output=embed"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        {/* Hosted By */}

        <div className="flex flex-col items-start gap-4 mt-18">
          <div className="flex gap-4">
            <img
              src={userDummyData.image}
              alt=""
              className="h-14 w-14 md:h-18 md:w-18 rounded-full object-cover"
            />

            <div>
              <p className="text-lg md:text-xl">Hosted by {room.hotel.name}</p>
              <div className="flex items-center gap-1 mt-2">
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <Star key={index} filled={4 > index} />
                  ))}
                <p className="ml-2">200+ reviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default RoomDetails;
