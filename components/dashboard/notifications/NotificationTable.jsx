import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { TiPlus } from "react-icons/ti";
import NotificationTableHead from "./NotificationTableHead";
import NotificationTableBody from "./NotificationTableBody";

const NotificationTable = () => {
  const dummyArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className="w-full  rounded-xl flex flex-col justify-start px-2 md:px-6 h-auto bg-white shadow-sm items-start">
      <div className="w-full h-auto flex flex-col justify-start items-start gap-2 ">
        <div className="w-full h-16 flex items-center  justify-start">
          <div className="text-2xl flex justify-start gap-1 items-center text-gray-900 font-semibold">
            <span>Push Notifications</span>
            <span className="text-2xl text-gray-400">({50})</span>
          </div>
        </div>

        <div className="w-full h-auto flex justify-between items-center">
          <div className="w-40 h-10 md:w-60 md:h-12 relative">
            <input
              type="text"
              className="w-full h-full rounded-xl bg-gray-100 border border-gray-400 outline-none focus:ring-2 focus:ring-[#8cd790]   px-3"
              placeholder="Search"
            />
            <button className="w-10 h-[80%] bg-[#8cd790] text-white outline-none border-none focus:bg-green-400 flex items-center justify-center absolute top-1 right-1 rounded-lg">
              <IoSearchOutline className="text-2xl" />
            </button>
          </div>

          <Link
            to="/notifications/create/"
            className="w-auto h-10 px-2 rounded-xl md:h-12 flex bg-[#8cd790] text-black justify-center items-center gap-[1px] transition-all duration-200 hover:opacity-90 shadow-sm "
          >
            <TiPlus />
            <span className="text-sm md:text-md font-extrabold">
              Create Notification
            </span>
          </Link>
        </div>
      </div>

      <div className="w-full flex flex-col py-4 lg:px-2 justify-start items-start">
        <div className="relative overflow-x-auto w-full h-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <NotificationTableHead />
            {dummyArr.map((item, key) => {
              return <NotificationTableBody key={key} />;
            })}
          </table>
        </div>
      </div>
    </div>
  );
};

export default NotificationTable;
