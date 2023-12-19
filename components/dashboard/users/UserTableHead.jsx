import React from "react";

const UserTableHead = () => {
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
          Orders
        </th>

        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
  );
};

export default UserTableHead;
