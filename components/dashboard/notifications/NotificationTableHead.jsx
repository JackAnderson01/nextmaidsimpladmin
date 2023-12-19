import React from 'react'

const NotificationTableHead = () => {
  return (
    <thead className="text-md text-gray-700 uppercase bg-[#8cd790] ">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Title
                </th>
                <th scope="col" className="px-6 py-3">
                    Date
                </th>
                
                <th scope="col" className="px-6 py-3">
                    Status
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
  )
}

export default NotificationTableHead