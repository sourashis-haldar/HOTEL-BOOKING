import React, { useEffect, useState } from "react";
import Title from "./Title";
import { assets, userBookingsDummyData } from "../assets/assets";

import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

function Mybookings() {
  const [bookings, setbookings] = useState([]);
  const { axios, getToken } = useAppContext();


// fetch bokings 
  const fetchBookings = async () => {
    const { data } = await axios.get("/api/bookings/user", {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    });
    if (data.succes) {
      setbookings(data.bookings);
      console.log(data.bookings)
    } else {
      toast.error(data.message);
    }
  };
  useEffect(() => {
    fetchBookings();
  }, []);


//canecl booking
const cancelBooking = async (id) => {
    try {
      const { data } = await axios.delete(
        `/api/bookings/cancel-bookings/${id}`,
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        },
      );
      if (data.success) {
        toast.success(data.message);
        fetchBookings();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

// payment handeler

const paymentHandeler = async (orderamount, bookingId) => {

  const { data } = await axios.post(
    "/api/payment/create-payment",
    {
      orderamount,
      bookingId,
    },
    {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    },
  );

  console.log(data);

  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY,

    amount: data.order.amount,

    currency: data.order.currency,

    name: "Hotel Booking",

    description: "Room Booking",

    order_id: data.order.id,
    handler: async (response) => {
      await verifyPayment(response, bookingId);
    },
  };
  const razor = new window.Razorpay(options);

  razor.open();
 
};


// verify payment 


const verifyPayment = async (payment, bookingId) => {
  await axios.post(
    "/api/payment/verify",
    {
      bookingId:bookingId,

      razorpay_order_id: payment.razorpay_order_id,

      razorpay_payment_id: payment.razorpay_payment_id,

      razorpay_signature: payment.razorpay_signature,
    },
    {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    },
  );
   fetchBookings();
};






  return (
    <div className="py-28 md:pb-35 md:pt-32   px-4 md:px-16 lg:px-24 xl:px-32 ">
      <Title
        title="My Bookings"
        subTitle="Easily manage your past, current, and upcoming hotel reservations in one place. Plan your trips seamlessly with just a few clicks"
        align="left"
      />

      <div className="max-w-6xl mt-8 w-full text-gray-800">
        <div className="hidden md:grid md:grid-cols-[3fr_2fr_1fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3">
          <div className="w-1/3">Hotels</div>
          <div className="w-1/3">Date & Timings</div>
          <div className="w-1/3">Payment</div>
        </div>

        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr_1fr] w-full border-b border-gray-300 py-6 first:border-t"
          >
            {/* Hotel Details */}
            <div className="flex flex-col md:flex-row">
              <img
                src={booking.room.images[0]}
                alt="hotel-img"
                className="md:w-44 rounded shadow object-cover"
              />
              <div className="flex flex-col gap-1.5 max-md:mt-3 md:ml-4">
                <p className="font-playfair text-2xl">
                  {booking.hotel.name}
                  <span className="font-inter text-sm">
                    ({booking.room.roomType})
                  </span>
                </p>
                <div className="flex items-center gap-1 text-sm text-gary-500">
                  <img src={assets.locationIcon} alt="location-icon" />
                  <span>{booking.hotel.address}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gary-500">
                  <img src={assets.guestsIcon} alt="guest-icon" />
                  <span>Guest: {booking.guests}</span>
                </div>
                <p className="text-base">Total {booking.totalPrice}</p>
              </div>
            </div>
            {/* Data And Time */}
            <div className="flex flex-row md:items-center md:gap-12 mt-3 gap-8">
              <div>
                <p>Check-In: </p>
                <p className="text-gray-500 text-sm">
                  {new Date(booking.checkInDate).toDateString()}
                </p>
              </div>
              <div>
                <p>Check-Out: </p>
                <p className="text-gray-500 text-sm">
                  {new Date(booking.checkOutDate).toDateString()}
                </p>
              </div>
            </div>
            {/* Payment Status */}
            <div className="flex flex-col items-start justify-center pt-3">
              <div className="flex items-center gap-2">
                <div
                  className={`h-3 w-3 rounded-full ${booking.ispaid ? "bg-green-500" : "bg-red-500"}`}
                ></div>
                <p
                  className={`text-sm ${booking.ispaid ? "text-green-500" : "text-red-500"}`}
                >
                  {booking.ispaid ? "Paid" : "Unpaid"}
                </p>
              </div>
              {!booking.ispaid && (
                <button
                  className="px-4 py-1.5 mt-4 text-xs border border-gary-400 rounded-full hover:bg-gray-50 transition-all cursor-pointer "
                  onClick={() =>
                    paymentHandeler(booking.totalPrice, booking._id)
                  }
                >
                  Pay Now
                </button>
              )}
            </div>
            <div className="felx justify-center items-center pt-3 md:pt-10">
              <button
                type="button"
                className="text-red-500  border rounded-xl  hover:bg-warning hover:text-white hover:bg-red-500 hover:cursor-pointer  font-medium leading-5 rounded-base px-4 py-2.5 text-sm "
                onClick={() => {
                  cancelBooking(booking._id);
                }}
              >
                Cancel Booking
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Mybookings;
