import React, { useState } from "react";
import { assets, cities } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";

function HotelReg() {
  const { setShowHotelReg, axios, getToken, setisowner } = useAppContext();
  const [loading, setloading] = useState(false);

  const [formdata, setformdata] = useState({
    name: "",
    contact: "",
    city: "",
    address: "",
  });

  const handelchnage = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const { data } = await axios.post(
        "/api/hotels/register-hotel",
        formdata,
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        },
      );
      if (data.success) {
        setloading(false);
        toast.success(data.message);
        setisowner(true);
        setformdata({
          name: "",
          address: "",
          city: "",
          contact: "",
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    finally{
      setloading(false)
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center justify-center bg-black/70 ">
      <form
        onSubmit={handelSubmit}
        className="flex bg-white  max-w-4xl rounded-xl max-md:mx-2"
      >
        <img
          src={assets.regImage}
          alt="reg-image"
          className="w-1/2 rounded-xl hidden md:block"
        />
        <div className="relative flex flex-col items-center md:w-1/2 p-8 md:p-10">
          <img
            src={assets.closeIcon}
            onClick={() => setShowHotelReg(false)}
            alt="close-icon"
            className="absolute top-4 right-4 h-4 w-4 cursor-pointer"
          />
          <p className="text-2xl  font-semibold mt-6">Register Your Hotel</p>
          <div className="w-full  mt-4">
            <label htmlFor="name" className="font-medium text-gray-500">
              Hotel Name
            </label>
            <input
              id="name"
              name="name"
              value={formdata.name}
              onChange={handelchnage}
              type="text"
              placeholder="Type here"
              className="border border-gary-200 rounded w-full px-3 py-2.5 mmt-1 outline-indigo-500 font-light"
              required
            />
          </div>
          <div className="w-full  mt-4">
            <label htmlFor="contact" className="font-medium text-gray-500">
              Phone
            </label>
            <input
              type="text"
              name="contact"
              value={formdata.contact}
              onChange={handelchnage}
              id="contact"
              placeholder="Type here"
              className="border border-gary-200 rounded w-full px-3 py-2.5 mmt-1 outline-indigo-500 font-light"
              required
            />
          </div>
          <div className="w-full  mt-4">
            <label htmlFor="adress" className="font-medium text-gray-500">
              Adress
            </label>
            <input
              type="text"
              id="adress"
              name="address"
              onChange={handelchnage}
              value={formdata.address}
              placeholder="Type here"
              className="border border-gary-200 rounded w-full px-3 py-2.5 mmt-1 outline-indigo-500 font-light"
              required
            />
          </div>
          <div className="w-full mt-4">
            <label htmlFor="city" className="font-medium text-gray-500">
              City
            </label>
            <select
              id="city"
              name="city"
              value={formdata.city}
              onChange={handelchnage}
              className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outlne-indigo-500 font-light"
            >
              <option value="" selected disabled>
                Select City
              </option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <button className="bg-indigo-500  hover:bg-indigo-600  transition-all text-white mr-auto  px-6 py-2 rounded cursor-pointer mt-6 ">
            {loading ? (
              <>
                <LoaderCircle className="h-4 w-4 animate-spin inline" /> {" "}Registering...
              </>
            ) : (
              "Register"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default HotelReg;
