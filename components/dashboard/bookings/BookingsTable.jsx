import React, { useState } from "react";
import { TiPlus } from "react-icons/ti";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import BookingsTableHead from "./BookingsTableHead";
import BookingsTableBody from "./BookingsTableBody";
import BookingModal from "./BookingModal";

const BookingsTable = () => {
  const dummyArr = [1, 2, 3, 4, 5, 5, 6, 7, 8, 9, 9, 0, 1, 2, 3, 4, 5];

  const [activeFilter, setActiveFilter] = useState("All");
    const toggleDropdown =() => {
        const dropdown = document.getElementById('bookings-filter-dropdown');
        dropdown.classList.toggle('hidden')
    }

  return (
    <div className="w-full  rounded-xl flex flex-col justify-start px-2 md:px-6 h-auto bg-white shadow-sm items-start">
      <div className="w-full h-auto flex flex-col justify-start items-start gap-2 ">
        <div className="w-full h-16 flex items-center  justify-start">
          <div className="text-2xl flex justify-start gap-1 items-center text-gray-900 font-semibold">
            <span>Bookings</span>
            <span className="text-2xl text-gray-400">({50})</span>
          </div>
        </div>

        <div className="relative w-full h-auto flex justify-between items-center">
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

          <button
          onClick={toggleDropdown}
            id="booking-filter-btn"
            className="relative me-3 mb-3 w-32 h-10 md:mb-0 text-white bg-[#8cd790] hover:bg-green-400 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg flex items-center justify-between text-sm px-5 py-2.5 text-center "
            type="button"
          >
            <span>

            {activeFilter}{" "}
            </span>
            <svg
              className="w-2.5 h-2.5 ml-auto ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          {/* <!-- Dropdown menu --> */}
          <div
            id="bookings-filter-dropdown"
            className=" hidden absolute top-14 right-0 w-36 z-[1000] bg-white divide-y divide-gray-100 rounded-lg shadow"
          >
            <ul
              className="py-2 text-sm text-gray-700"
              aria-labelledby="dropdownBottomButton"
            >
              <li className="w-full">
                <button
                  onClick={() => {
                    setActiveFilter("All");
                    toggleDropdown();
                  }}
                  className=" items-center px-3 w-full flex justify-start py-2 hover:bg-gray-100 "
                >
                  All
                </button>
                </li>
                <li className="w-full">
                <button
                  onClick={() => {
                    setActiveFilter("Completed");
                    toggleDropdown();
                  }}
                  className=" items-center px-3 w-full flex justify-start py-2 hover:bg-gray-100 "
                >
                  Completed
                </button>
              </li>
              <li className="w-full">
                <button
                  onClick={() => {
                    setActiveFilter("Confirmed");
                    toggleDropdown();
                  }}
                  className=" items-center px-3 w-full flex justify-start py-2 hover:bg-gray-100 "
                >
                  Confirmed
                </button>
              </li>
              <li className="w-full">
                <button
                  onClick={() => {
                    setActiveFilter("Cancelled");
                  }}
                  className=" items-center px-3 w-full flex justify-start py-2 hover:bg-gray-100 "
                >
                  Cancelled
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col py-4 lg:px-2 justify-start items-start">
        <div className="relative overflow-x-auto w-full h-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <BookingsTableHead />
            {dummyArr.map((obj, key) => {
              return <BookingsTableBody key={key} />;
            })}
          </table>
          <BookingModal />
        </div>
      </div>
    </div>
  );
};

export default BookingsTable;
