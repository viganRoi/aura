import React from "react";
import { useNavigate } from "react-router-dom";

const BuildingTable = ({ apartments }) => {
  const navigate = useNavigate();
  console.log(apartments);
  return (
    <div className="w-full h-full flex justify-center items-center py-12 md:py-6">
      <div className="w-full px-0 md:px-12 h-full flex items-center justify-center">
        <div className="h-full w-full overflow-x-auto sm:overflow-y-auto">
          <table className="min-w-full table-auto text-xs sm:text-sm text-left border-separate border-spacing-0">
            <thead className="bg-primary h-10 sm:h-12 text-black uppercase sticky top-0 z-10">
              <tr>
                <th className="px-4 sm:px-6 py-2 sm:py-3 font-medium">
                  Apartment
                </th>
                <th className="px-4 sm:px-6 py-2 sm:py-3 font-medium">Tipi</th>
                <th className="px-4 sm:px-6 py-2 sm:py-3 font-medium">
                  Siperfaqja
                </th>
                <th className="px-4 sm:px-6 py-2 sm:py-3 font-medium">Kati</th>
              </tr>
            </thead>
            <tbody>
              {[...apartments]
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((apartment, i) => (
                  <tr
                    key={apartment.id}
                    className={`${
                      i % 2 === 0 ? "bg-black" : "bg-[#3a3a3a]/50"
                    } h-10 sm:h-12 w-full text-white cursor-pointer ${
                      apartment.isSold ? "bg-red-500" : ""
                    } ${apartment.isReserved ? "bg-orange-400" : ""}`}
                    onClick={() => navigate(`/apartments/${apartment.id}`)}
                  >
                    <td className="px-4 sm:px-6 py-2 sm:py-4">
                      {apartment.name}
                    </td>
                    <td className="px-4 sm:px-6 py-2 sm:py-4">
                      {apartment.rooms}+1
                    </td>
                    <td className="px-4 sm:px-6 py-2 sm:py-4">
                      {apartment.square}m<sup>2</sup>
                    </td>
                    <td className="px-4 sm:px-6 py-2 sm:py-4">
                      {apartment.floorNumber}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BuildingTable;
