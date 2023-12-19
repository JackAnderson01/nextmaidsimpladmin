import React from "react";
import StatsGraph from "./StatsGraph";

const StatsGraphContainer = () => {
  return (
    <div className="w-full h-auto flex flex-col justify-start bg-white p-2 lg:p-8 rounded-xl items-start">
      <div className="w-full h-10 flex justify-between items-center  ">
        <span className="text-lg lg:text-xl font-semibold text-gray-900">
          Track Work Progress
        </span>

        <div className="w-auto h-auto flex justify-start items-center gap-[2px]">

            <div className="w-20 h-auto flex justify-start items-center gap-[2px]">

                <span className="w-2 h-2 rounded-full bg-[#3DA2FF]"/>

                <span className="text-xs text-gray-900">
                    Total Users
                </span>


            </div>

            <div className="w-24 h-auto flex justify-start items-center gap-[2px]">

                <span className="w-2 h-2 rounded-full bg-[#3FB743]"/>

                <span className="text-xs text-gray-900">
                    Total Cleaners
                </span>


            </div>
        </div>
      </div>

      <div className="w-full h-96  mt-14">
            <StatsGraph />
      </div>
    </div>
  );
};

export default StatsGraphContainer;
