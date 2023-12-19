import React from 'react'

const BlockModal = () => {


    const closeBlockModal = () => {
        const modal = document.getElementById("block-modal");
        modal.classList.add("hidden");
        modal.classList.remove("flex");
      };


      const sendRequest = () => {

      }

  return (
    <div
      id="block-modal"
      className="fixed  top-0 left-0 transition-all duration-300  w-screen min-h-screen  h-auto z-[1000] hidden justify-center items-center px-2 md:px-0 bg-[#000]/[0.46]"
    >
      <div className="relative w-96 h-auto rounded-2xl bg-white flex gap-4 items-start py-5 px-6 justify-center flex-col">
        <h1 className="text-2xl font-semibold text-gray-900">Block User</h1>
        <span className="text-lg font-medium text-gray-500">
          Are you sure you want to block this user?
        </span>

        <div className="w-full h-auto flex mt-2 justify-end items-center gap-2">
          <button
            onClick={closeBlockModal}
            className="text-black hover:underline w-20 h-10 text-lg font-medium"
          >
            Cancel
          </button>

          <button
            onClick={sendRequest}
            className=" w-24 h-10 bg-[#1c1c1c] text-white transition-all duration-200 hover:opacity-90 rounded-full text-lg font-medium"
          >
            Block
          </button>
        </div>
      </div>
    </div>
  )
}

export default BlockModal