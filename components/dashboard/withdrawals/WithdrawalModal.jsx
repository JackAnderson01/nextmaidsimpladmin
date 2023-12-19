import React from "react";
import { IoClose } from "react-icons/io5";

const WithdrawalModal = ({ status }) => {
  const closeWithdrawalModal = () => {
    const modal = document.getElementById("withdrawal-modal");
    modal.classList.remove("flex");
    modal.classList.add("hidden");
  };

  return (
    <div
      id="withdrawal-modal"
      className="fixed  top-0 left-0 transition-all duration-300  w-screen min-h-screen  h-auto z-[1000] hidden justify-center items-center px-2 md:px-0 bg-[#000]/[0.46]"
    >
      <div className="relative w-[30rem] h-auto rounded-2xl bg-white flex gap-4 items-start py-5 px-6 justify-center flex-col">
        <div className="h-10 w-full flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Withdrawal Details
          </h1>

          <button
            onClick={closeWithdrawalModal}
            className="outline-none flex items-center justify-center text-3xl"
          >
            <IoClose />
          </button>
        </div>

        <div className="w-full h-auto flex flex-col gap-8 justify-start items-start">
          <div className="w-full h-auto flex justify-between items-center">
            <div className="w-1/2 h-auto flex flex-col justify-start items-start">
              <h1 className="text-gray-900 font-semibold text-sm ">
                Customer Name
              </h1>
              <span className="text-xs text-gray-500 font-medium">
                Olivia James
              </span>
            </div>

            <div className="w-1/2 h-auto flex flex-col justify-start items-start">
              <h1 className="text-gray-900 font-semibold text-sm ">
                Booking ID
              </h1>
              <span className="text-xs text-gray-500 font-medium">626497</span>
            </div>
          </div>

          <div className="w-full h-auto flex justify-between items-center">
            <div className="w-1/2 h-auto flex flex-col justify-start items-start">
              <h1 className="text-gray-900 font-semibold text-sm ">
                Card Details
              </h1>
              <span className="text-xs text-gray-500 font-medium">
                ***********5080
              </span>
            </div>

            <div className="w-1/2 h-auto flex flex-col justify-start items-start">
              <h1 className="text-gray-900 font-semibold text-sm ">Date</h1>
              <span className="text-xs text-gray-500 font-medium">
                MM/DD/YYYY
              </span>
            </div>
          </div>

          <div className="w-full h-auto flex justify-between items-center">
            <div className="w-1/2 h-auto flex flex-col justify-start items-start">
              <h1 className="text-gray-900 font-semibold text-sm ">
                Payment ID
              </h1>
              <span className="text-xs text-gray-500 font-medium">2345678</span>
            </div>

            <div className="w-1/2 h-auto flex flex-col justify-start items-start">
              <h1 className="text-gray-900 font-semibold text-sm ">
                Refund Amount
              </h1>
              <span className="text-xs text-gray-500 font-medium">$550.00</span>
            </div>
          </div>

          {status === "completed" && (
            <div className="w-full h-auto flex justify-between items-center">
              <div className="w-1/2 h-auto flex flex-col justify-start items-start">
                <h1 className="text-gray-900 font-semibold text-sm ">
                  Refund Date
                </h1>
                <span className="text-xs text-gray-500 font-medium">
                  MM/DD/YYYY
                </span>
              </div>
            </div>
          )}
        </div>

        {status == "new" && (
          <div className="w-full mt-4 h-auto flex justify-start items-start">
            <button className="text-white w-32 h-10 rounded-full bg-green-500 font-medium flex items-center justify-center transition-all duration-200 hover:opacity-90">
              Approve
            </button>
          </div>
        )}

        {status == "approved" && (
          <div className="w-full mt-4 h-auto flex justify-start items-start">
            <button className="text-white w-40 h-10 rounded-full bg-green-500 font-medium flex items-center justify-center transition-all duration-200 hover:opacity-90">
              Mark as completed
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WithdrawalModal;
