import React from "react";
import {MdDelete} from "react-icons/md";
import {ImBlocked} from "react-icons/im"


const CleanerTableBody = () => {
  const openUnableDeleteModal = () => {
    const modal = document.getElementById("unable-delete-modal");
    modal.classList.add("flex");
    modal.classList.remove("hidden");
  }

  const openBlockModal = () => {
    const modal = document.getElementById("block-modal");
    modal.classList.add("flex");
    modal.classList.remove("hidden");
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
        <td className="px-6 py-3 text-yellow-400">
          <svg
            className="inline w-4 h-4 me-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <span className="text-gray-900">4.8</span>

        </td>



        <td className="px-6  py-3 flex gap-2 justify-start">
          <button onClick={openUnableDeleteModal} className="text-md text-red-500 bg-red-500/[0.4] rounded-full w-6 h-6 flex items-center justify-center ">
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

export default CleanerTableBody;
