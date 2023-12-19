import React from 'react'
import {IoClose} from "react-icons/io5";

const BookingModal = () => {

    const closeBookingModal = () => {
        const modal = document.getElementById('booking-modal');
        modal.classList.remove('flex');
        modal.classList.add('hidden');
    }


  return (
    <div
      id="booking-modal"
      className="fixed  top-0 left-0 transition-all duration-300  w-screen min-h-screen  h-auto z-[1000] hidden justify-center items-center px-2 md:px-0 bg-[#000]/[0.46]"
    >
      <div className="relative w-[30rem] h-auto rounded-2xl bg-white flex gap-4 items-start py-5 px-6 justify-center flex-col">
        <div className="h-10 w-full flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Booking Details
          </h1>

          <button
            onClick={closeBookingModal}
            className="outline-none flex items-center justify-center text-3xl"
          >
            <IoClose />
          </button>
        </div>

        <div className="w-full h-auto flex flex-col gap-8 justify-start items-start">
          <div className="w-full h-auto flex justify-between items-center">
            <div className="w-1/2 h-auto flex flex-col justify-start items-start">
              <h1 className="text-gray-900 font-semibold text-sm ">
                Customer Name
              </h1>
              <span className="text-xs text-gray-500 font-medium">
                Olivia James
              </span>
            </div>

            <div className="w-1/2 h-auto flex flex-col justify-start items-start">
              <h1 className="text-gray-900 font-semibold text-sm ">
                Booking ID
              </h1>
              <span className="text-xs text-gray-500 font-medium">626497</span>
            </div>
          </div>

          <div className="w-full h-auto flex justify-between items-center">
            <div className="w-1/2 h-auto flex flex-col justify-start items-start">
              <h1 className="text-gray-900 font-semibold text-sm ">
                Address
              </h1>
              <span className="text-xs w-[90%] text-gray-500 font-medium">
              20909 N 90th Pl, Scottsdale, Arkansas
              </span>
            </div>

            <div className="w-1/2 h-auto flex flex-col justify-start items-start">
              <h1 className="text-gray-900 font-semibold text-sm ">Amount</h1>
              <span className="text-xs text-gray-500 font-medium">
                $150.00
              </span>
            </div>
          </div>

          <div className="w-full h-auto flex justify-between items-center">
            <div className="w-1/2 h-auto flex flex-col justify-start items-start">
              <h1 className="text-gray-900 font-semibold text-sm ">
                Phone Number
              </h1>
              <span className="text-xs text-gray-500 font-medium">+1 374 850 374</span>
            </div>

            <div className="w-1/2 h-auto flex flex-col justify-start items-start">
              <h1 className="text-gray-900 font-semibold text-sm ">
                Cleaning Type
              </h1>
              <span className="text-xs text-gray-500 font-medium">Base Clean</span>
            </div>
          </div>

         
        </div>

       
      </div>
    </div>
  )
}

export default BookingModal