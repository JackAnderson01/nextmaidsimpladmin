import React from 'react'

const CleanerTableHead = () => {
  return (
    
    <thead className="text-md text-gray-700 uppercase bg-[#8cd790] ">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Username
                </th>
                
                <th scope="col" className="px-6 py-3">
                    Jobs
                </th>
                <th scope="col" className="px-6 py-3">
                    Rating
                </th>
                
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
  )
}

export default CleanerTableHead