import React from 'react'

const HomeUserTableHead = () => {
  return (
    <thead className="text-md text-gray-700 uppercase bg-gray-100 border ">
      <tr>
        <th scope="col" className="px-6 py-3">
          Name
        </th>
        <th scope="col" className="px-6 py-3">
          Username
        </th>

        <th scope="col" className="px-6 py-3">
          Orders completed
        </th>

        
      </tr>
    </thead>
  )
}

export default HomeUserTableHead