import React, {useState} from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const BookingsTableHead = () => {
    const toggleDateFilter = () => {
        const filterModal = document.getElementById("bookings-date-filter");
        filterModal.classList.toggle("hidden");
    };
    
    const [date, setDate] = useState(new Date());
  return (
    <thead className="text-md text-gray-700 uppercase bg-[#8cd790] ">
      <tr>
        <th scope="col" className="px-6 py-3">
          Customer Name
        </th>
        <th scope="col" className="absolute px-6 py-3 flex gap-1 items-center">
          <span>Booking Date</span>
          <MdKeyboardArrowDown
            className="text-lg cursor-pointer"
            onClick={toggleDateFilter}
          />
          <div id="bookings-date-filter" className="w-auto h-auto hidden bg-white absolute top-8 -right-20">
          <Calendar onChange={(prev) => {setDate(prev); toggleDateFilter()}} value={date} />
          </div>
        </th>
        <th scope="col" className="px-6 py-3">
          Booking ID
        </th>
        <th scope="col" className="px-6 py-3">
          Phone Number
        </th>
        <th scope="col" className="px-6 py-3">
          Cleaning Type
        </th>
        <th scope="col" className="px-6 py-3">
          Status
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
  );
};

export default BookingsTableHead;
