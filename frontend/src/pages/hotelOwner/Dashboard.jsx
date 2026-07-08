import { useEffect, useState } from 'react';
import { assets, dashboardDummyData } from '../../assets/assets';
import Title from '../../components/Title'
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Dashboard = () => {
    const [Dashboard_Data, setDashboard_Data] = useState({
      totalbooking:0,
      totaleRevenue:0,
      bookings:[]
    });
    

    const {user,axios,getToken}=useAppContext();

    const fetchbookings=async ()=>{
      try {
        const { data } = await axios.get("/api/bookings/hotel", {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        });
        if (data.success) {
          setDashboard_Data(data.Dashboarddata);
          
        } else {
          toast.error(data.message)
                  }
      } catch (error) {
        toast.error(error.message)
      }

    }
useEffect(()=>{
if(user){
  fetchbookings()
}
},[user])

  return (
    <div>
      <Title
        align="left"
        font="outfit"
        title="Dashboard"
        subTitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
      />

      <div className="flex gap-4 my-8">
        {/* Tottal Bookings */}
        <div className="bg-primary/3 border border-primary/10 rounded flex items-center p-4 pr-8">
          <img
            src={assets.totalBookingIcon}
            alt="TotalBokingicon"
            className="max-sm:hidden"
          />
          <div className="flex flex-col sm:ml-4 font-medium">
            <p className="text-blue-500 text-lg">Total Bookings</p>
            <p className="text-neutral-400 text-base">
              {Dashboard_Data.totalbooking}
            </p>
          </div>
        </div>
        {/* Total Reveue */}
        <div>
          <div className="bg-primary/3 border border-primary/10 rounded flex items-center p-4 pr-8">
            <img
              src={assets.totalRevenueIcon}
              alt="TotalBokingicon"
              className="max-sm:hidden"
            />
            <div className="flex flex-col sm:ml-4 font-medium">
              <p className="text-blue-500 text-lg">Total Revenue</p>
              <p className="text-neutral-400 text-base">
                 {Dashboard_Data.totaleRevenue}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Recent Bookings */}
      <h2 className="text-xl text-blue-950/70 font-medium mb-5">
        Recent Booings
      </h2>
      <div
        className="w-full max-w-3xl text-left border border-gray-300 
      rounded-lg max-h-80 overflow-y-scroll"
      >
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-gray-800 font-medium">User Name</th>
              <th className="py-3 px-4 text-gray-800 font-medium max-sm:hidden">
                Room Name
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium">
                Total Amount
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">
                Payment Status
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {Dashboard_Data.bookings.map((item, index) => {
              return (
                <tr key={index}>
                  <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                    {item.user.username}
                  </td>
                  <td className="py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden">
                    {item.room.roomType}
                  </td>
                  <td className="py-3 px-4 text-gray-700 border-t border-gray-300 tex-center">
                     {item.totalPrice}
                  </td>

                  <td className="py-3 px-4 border-t text-center border-gray-300 flex">
                    <button
                      className={`py-1 px-3 text-xs rounded-full mx-auto ${item.ispaid ? "bg-green-200 text-green-600" : "bg-amber-200 text-yellow-600"}`}
                    >
                      {item.ispaid ? "Completed" : "Pending"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard