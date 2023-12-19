import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";

const PasswordUpdatedModal = () => {
  const closePasswordUpdatedModal = () => {
    const modal = document.getElementById("pass-updated-modal");
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  };

  

  return (
    <div
      id="pass-updated-modal"
      className="fixed top-0 left-0  w-screen h-screen z-[1000] hidden justify-center items-center px-2 md:px-0 bg-[#000]/[0.46]"
    >
      <div className="w-full relative md:w-[500px] h-auto md:h-[450px] rounded-xl flex flex-col shadow-sm gap-6 items-center justify-center bg-white p-8 ">
        <button
          onClick={closePasswordUpdatedModal}
          className="w-10 h-10 flex absolute top-2 right-2 items-center justify-center bg-white text-black"
        >
          <IoClose className="text-2xl hover:text-[#8cd790]" />
        </button>
        <img src="/assets/passupdated.svg" alt="pass-updated-img" className="h-48" />
        <h1 className="text-4xl text-center font-extrabold text-[#8cd790]">
          Password Updated Successfully
        </h1>
      </div>
    </div>
  );
};

export default PasswordUpdatedModal;
