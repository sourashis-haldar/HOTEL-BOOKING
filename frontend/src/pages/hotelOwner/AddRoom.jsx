import React, { useState } from "react";
import Title from "../../components/Title";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";

const AddRoom = () => {

const {axios,getToken}=useAppContext()

const[isloading,setisloading]=useState(false)

  const [images, setimages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });

  const [Inputs, setInputs] = useState({
    roomType: "",
    pricePerNight: 0,
    amenities: {
      "Free WiFi": false,
      "Free Breakfast": false,
      "Room Service": false,
      "Mountain View": false,
      "Pool Access": false,
    },
  });
const handelsubmit=async (e)=>{
e.preventDefault();
if(!Inputs.roomType || !Inputs.pricePerNight || !Inputs.amenities || !Object.values(images).some(image=>image)){
toast.error("Plese fill in all the details ")
return ;
}
try {
  setisloading(true);
  const formdata=new FormData();
  formdata.append("roomType",Inputs.roomType);
  formdata.append("pricePerNight", Inputs.pricePerNight);
   const amenities=Object.keys(Inputs.amenities).filter(key=>Inputs.amenities[key]==true)
formdata.append('amenities',JSON.stringify(amenities));

Object.keys(images).forEach((key)=>{
images[key] && formdata.append('images',images[key])

})
const {data} =await axios.post("/api/rooms/uploads", formdata, {
  headers: {
    Authorization: `Bearer ${await getToken()}`
  },
});

if (data.success) {
  setisloading(false);
  setimages({
    1: null,
    2: null,
    3: null,
    4: null,
  });
  setInputs({
    roomType: "",
    pricePerNight: 0,
    amenities: {
      "Free WiFi": false,
      "Free Breakfast": false,
      "Room Service": false,
      "Mountain View": false,
      "Pool Access": false,
    },
  });
  toast.success(data.message);
}else{
  toast.error(data.message)
}
} 
catch (error) {
 toast.error(error.message)
}
finally{
  setisloading(false)
}



}





  return (
    <form onSubmit={handelsubmit}>
      <Title
        align="left"
        font="outfit"
        title="Add Room"
        subTitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
      />
      {/* Upload Area For Images */}
      <p className="text-gray-800 mt-10">Images</p>
      <div className="grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap">
        {Object.keys(images).map((key) => (
          <label htmlFor={`rooImage${key}`} key={key}>
            <img
              className="max-h-13 cursor-pointer opacity-80"
              src={
                images[key]
                  ? URL.createObjectURL(images[key])
                  : assets.uploadArea
              }
              alt=""
            />
            <input
              type="file"
              accept="image/*"
              id={`rooImage${key}`}
              hidden
              onChange={(e) => {
                setimages({ ...images, [key]: e.target.files[0] });
              }}
            />
          </label>
        ))}
      </div>

      <div className="w-full flex max-sm:flex-col sm:gap-4 mt-4">
        <div className="flex-1 max-w-65">
          <p className="text-gray-800 mt-4">Room Type</p>
          <select
            value={Inputs.roomType}
            required
            onChange={(e) => setInputs({ ...Inputs, roomType: e.target.value })}
            className="border opacity-70 border-gray-300 mt-1 rounded p-2 w-full"
          >
            <option value="">Select Room Type</option>
            <option value="Single Bed">Single Bed</option>
            <option value="Double Bed">Double Bed</option>
            <option value="Luxury Rooom">Luxury Room</option>
            <option value="Family Suite">Family Suite</option>
          </select>
        </div>
        <div>
          <p className="mt-4 text-gary-800">
            Price <span className="text-xs">/night</span>{" "}
          </p>
          <input
            type="len"
            placeholder="0"
            className="border border-gray-300 mt-1 rounded p-2 w-65"
            value={Inputs.pricePerNight}
            onChange={(e) =>
              setInputs({ ...Inputs, pricePerNight: e.target.value })
            }
          />
        </div>
      </div>
      <p className="text-gray-800 mt-4">Amenities</p>
      <div className="flex flex-col flex-wrap mt-1 text-gray-400 max-w-sm">
        {Object.keys(Inputs.amenities).map((amenities, index) => (
          <div key={index}>
            <input
              type="checkbox"
              id={`amenities${index + 1}`}
              checked={Inputs.amenities[amenities]}
              onChange={(e) =>
                setInputs({
                  ...Inputs,
                  amenities: {
                    ...Inputs.amenities,
                    [amenities]: !Inputs.amenities[amenities],
                  },
                })
              }
            />
            <label htmlFor={`amenities${index + 1}`}>{amenities}</label>
          </div>
        ))}
      </div>
      <button
        disabled={isloading}
        className={`px-8 py-2 rounded mt-8 text-white transition-all
    ${
      isloading
        ? "bg-gray-400 cursor-not-allowed opacity-70"
        : "bg-primary cursor-pointer hover:opacity-90"
    }`}
      >
        {isloading ? (
          <>
            <LoaderCircle className="h-4 w-4 animate-spin inline" /> Adding
            Room..{" "}
          </>
        ) : (
          "Add Room"
        )}
      </button>
    </form>
  );
};

export default AddRoom;
