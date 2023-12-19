import React from "react";

const NotificationStatusBadge = ({ status }) => {
  return (
    <div
      className={`w-16 h-6 rounded-full flex items-center capitalize justify-center text-xs ${
        status === "delivered"
          ? "bg-[#41C54E]/[0.12] text-[#41c54e]"
          : "bg-[#FF9900]/[0.12] text-[#ff9900]"
      }`}
    >
      {status}
    </div>
  );
};

export default NotificationStatusBadge;
