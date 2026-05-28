import React, { useState } from 'react'
import { roomsDummyData } from '../../assets/assets'
import Title from '../../components/Title';

const ListRoom = () => {

  const [Rooms,setRooms]=useState(roomsDummyData);
  return (
    <div>
      <Title
        align="left"
        font="outfit"
        title="Room Listings"
        subTitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
      />
      <p className="text-gray-500 mt-8"> All Rooms</p>
      <div
        className="w-full max-w-3xl text-left border border-gray-300 
      rounded-lg max-h-80 overflow-y-scroll mt-3"
      >
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-gray-800 font-medium">Name</th>
              <th className="py-3 px-4 text-gray-800 font-medium max-sm:hidden">
                Facility
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium">
                Price /night
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {Rooms.map((Room, index) => {
              return (
                <tr key={index}>
                  <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                    {Room.roomType}
                  </td>
                  <td className="py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden">
                    {Room.amenities.join(",")}
                  </td>
                  <td className="py-3 px-4 text-gray-700 border-t border-gray-300 tex-center">
                    $ {Room.pricePerNight}
                  </td>

                  <td className="py-3 px-4 border-t text-center border-gray-300 flex">
                    <label class="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                      <input type="checkbox" class="sr-only peer" />
                      <div class="w-16 h-8 bg-slate-300 rounded-full peer peer-checked:bg-indigo-600 transition-colors duration-200"></div>
                      <span class="dot absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-8"></span>
                      
                    </label>
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

export default ListRoom