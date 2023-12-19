import React from "react";
import { MdDelete } from "react-icons/md";
import { ImBlocked } from "react-icons/im";

const UserTableBody = () => {

  const openBlockModal = () => {
    const modal = document.getElementById('block-modal');
    modal.classList.add('flex');
    modal.classList.remove('hidden');
  }

  const openDeleteModal = () => {
    const modal = document.getElementById('delete-modal');
    modal.classList.add('flex');
    modal.classList.remove('hidden');
  }


  return (
    <tbody className="border ">
      <tr className="bg-white border-b ">
        <th
          scope="row"
          className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap"
        >
          Olivia James
        </th>
        <td className="px-6 py-3">@oliviajames</td>
        <td className="px-6 py-3">240</td>
        

        <td className="px-6 py-3 flex items-center justify-start gap-2">
          <button onClick={openDeleteModal} className="text-md text-red-500 bg-red-500/[0.4] rounded-full w-6 h-6 flex items-center justify-center ">
            <MdDelete />
          </button>

          <button onClick={openBlockModal} className="text-md text-white bg-gray-600 rounded-full w-6 h-6 flex items-center justify-center ">
            <ImBlocked />
          </button>
        </td>
      </tr>
    </tbody>
  );
};

export default UserTableBody;
