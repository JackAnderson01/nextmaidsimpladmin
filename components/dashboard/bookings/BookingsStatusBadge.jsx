import React from "react";

const BookingsStatusBadge = ({ status }) => {
  return (
    <div
      className={`w-[4.2rem] h-6 rounded-full flex items-center capitalize justify-center text-[10px] px-1 ${
        status === "completed"
          ? "bg-[#1badff]/[0.12] text-[#1badff]"
          : status === "confirmed"
          ? "bg-[#4acf4e]/[0.12] text-[#4acf4e]"
          : "bg-[#FF9900]/[0.12] text-[#ff9900]"
      }`}
    >
      {status}
    </div>
  );
};

export default BookingsStatusBadge;
