"use client"

import React, { useState, useRef, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import Image from "next/Image";
import { useRouter } from "next/router";




const VerifyOtp = () => {
  

  //   OTP Functionality:
  const otpInputs = Array.from({ length: 4 }, () => useRef(null));

  useEffect(() => {
    otpInputs[0].current.focus();
  }, []);

  const handleInputChange = (index, e) => {
    const input = e.target;
    if (e.inputType === "deleteContentBackward" && index > 0) {
      otpInputs[index - 1].current.focus();
    } else if (index < otpInputs.length - 1 && input.value !== "") {
      otpInputs[index + 1].current.focus();
    }
  };

  // access functionalities:

  const navigate = useRouter();

  const navigateToPassChange = (e) => {
    e.preventDefault()
    //Other functionality of verfication of creating the user to the backend and issuing a validation token:

    navigate.push("/auth/recovery/changepassword/");
  };

  const sendAnotherOtp = () => {
    // Functionality build after integrations
  };

  return (
    <div className="w-full h-auto min-h-screen relative flex justify-between items-center bg-white">
      <div className="w-full lg:w-[45%] xl:w-[40%] h-full flex flex-col justify-start items-center gap-2 p-6 md:px-16 md:py-4 lg:py-8 lg:px-16">
        {/* Top bar */}
        <div className="w-full h-[20%]  flex flex-row justify-between items-start">
              {/* Logo */}
              <Link
              href="/"
              className="w-[40%] h-auto flex justify-start items-center"
            >
              {/* Image goes here */}
              {/* <img src="/logo.svg" alt="logo" className="w-36" /> */}
              <Image src="/assets/loginlogo.svg" width="256" height="64" alt="Logo"/>
            </Link>
        </div>

        {/* Form and Form Fields: */}
        <div className="w-full h-[55%] mt-20  flex flex-col justify-center items-start gap-8">
          <Link href="/auth/recovery/verify-email/">
            <FaArrowLeft className="text-3xl " />
          </Link>
          {/* Headings */}
          <div className="w-full h-[20%] flex flex-col justify-start items-start gap-2">
            <h1 className="text-5xl font-extrabold text-[#0e0e10]">
              Verfication
            </h1>
            <span className="text-lg font-semibold text-gray-600">
              Email verfication code sent to your email.
            </span>
          </div>

          {/* Input fields */}
          <form className="w-full h-[70%] gap-6 flex flex-col items-start justify-start">
            <div className="w-full h-auto flex flex-row items-start justify-start gap-3">
            {otpInputs.map((inputRef, index) => (
                <input
                  key={index}
                  ref={inputRef}
                  type="number"
                  maxLength="1"
                  onChange={(e) => handleInputChange(index, e)}
                  className=" otp-input w-[24%] h-20 lg:h-24 flex flex-col items-center justify-center text-center px-5 outline-none  border rounded-xl text-2xl font-bold border-gray-500  bg-white focus:bg-gray-50 focus:border-gray-800"
                  name=""
                  id=""
                  autoComplete="off"
                />
              ))}
            </div>

            <div className="w-auto flex justify-start items-center gap-2">
              <span className="text-md font-medium text-gray-400">
                Didn't recieved a code
              </span>
              <button
                onClick={sendAnotherOtp}
                className="text-[#8cd790] text-lg font-semibold"
              >
                Resend now
              </button>
            </div>
            <button
              onClick={navigateToPassChange}
              className="bg-[#8cd790] shadow-sm  h-[47px] text-[#fff] text-l font-semibold outline-none rounded-lg transition-all duration-200 hover:opacity-90 block w-full p-2.5"
            >
              Verify
            </button>
          </form>
        </div>
      </div>



      <div className="hidden lg:flex lg:w-[55%]  items-center pr-8 justify-center h-full">
          <img src="/assets/forgotpass.svg" alt="forgot_pass" className="w-full h-full" />
        </div>

    </div>
  );
};

export default VerifyOtp;
