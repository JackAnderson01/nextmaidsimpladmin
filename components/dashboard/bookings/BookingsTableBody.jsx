import React from 'react'
import BookingsStatusBadge from './BookingsStatusBadge'
import NotificationStatusBadge from '../notifications/NotificationStatusBadge'

const BookingsTableBody = () => {

    const openBookingModal = () => {
        const modal = document.getElementById('booking-modal');
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
  return (
    <tbody className='border '>
            <tr className="bg-white border-b ">
                <th scope="row" className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap">
                    Olivia James
                </th>
                <td className="px-6 py-3">
                    MM/DD/YYYY
                </td>
                <th scope="row" className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap">
                    123456789
                </th>
                <td className="px-6 py-3">
                    (123) 123-4657
                </td>
                <td className="px-6 py-3">
                    Base Clean
                </td>
                
                <td className="p-2">
                    <BookingsStatusBadge status={'completed'}/>
                </td>
                <td className="px-6 py-3">
                    <button onClick={openBookingModal} className='text-sm text-[#8cd790] hover:underline'>
                        View details
                    </button>
                </td>
            </tr>
            
        </tbody>
  )
}

export default BookingsTableBody