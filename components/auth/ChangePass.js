"use client"

import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";

const ChangePass = () => {
  const [togglePasswordVisibility, setTogglePasswordVisibility] =
    useState(false);
  const [toggleReEnterPasswordVisibility, setTogglereEnterPasswordVisibility] =
    useState(false);



    const openPasswordUpdatedModal = () => {
      const modal = document.getElementById("pass-updated-modal");
      modal.classList.add("flex");
      modal.classList.remove("hidden");
    };


  const navigate = useRouter();

  const updatePassAndNavigateToLogin = () => {
    //Other functionality of verfication of creating the user to the backend and issuing a validation token:

    openPasswordUpdatedModal();
    navigate.push("/auth/login/");

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
            <img src="/assets/loginlogo.svg" alt="logo" className="w-36" />
          </Link>
        </div>

        {/* Form and Form Fields: */}
        <div className="w-full h-[55%] mt-20  flex flex-col justify-center items-start gap-8">
          <Link href="/auth/recovery/verify-otp/">
            <FaArrowLeft className="text-3xl " />
          </Link>
          {/* Headings */}
          <div className="w-full h-[20%] flex flex-col justify-start items-start gap-2">
            <h1 className="text-5xl font-extrabold text-[#0e0e10]">
              Reset Password?
            </h1>
            <span className="text-lg font-semibold text-gray-600">
              Set new password.
            </span>
          </div>

          {/* Input fields */}
          <form className="w-full h-[70%] gap-6 flex flex-col items-start justify-start">
            <div className="w-full h-auto flex flex-col items-start justify-start gap-3">
              <div className="w-full h-auto">
                <label
                  htmlFor="password"
                  className="block mb-2  text-md text-gray-600 font-semibold"
                >
                  New Password
                </label>
                <div className="w-full h-full relative">
                  <input
                    type={togglePasswordVisibility ? "text" : "password"}
                    id="password"
                    className="border-2 h-[47px] border-gray-200 text-gray-800 font-semibold text-md outline-none rounded-lg focus:ring-gray-400 focus:border-gray-400 block w-full px-3.5 py-2.5"
                    required
                  />
                  {togglePasswordVisibility ? (
                    <FaEyeSlash
                      className="absolute top-[25%] right-4 text-gray-600 text-xl"
                      onClick={() => {
                        setTogglePasswordVisibility((prev) => !prev);
                      }}
                    />
                  ) : (
                    <FaEye
                      className="absolute top-[25%] right-4 text-gray-600 text-xl"
                      onClick={() => {
                        setTogglePasswordVisibility((prev) => !prev);
                      }}
                    />
                  )}
                </div>
              </div>
              
              <div className="w-full h-auto">
                <label
                  htmlFor="password"
                  className="block mb-2  text-md text-gray-600 font-semibold"
                >
                  Re-Type Password
                </label>
                <div className="w-full h-full relative">
                  <input
                    type={toggleReEnterPasswordVisibility ? "text" : "password"}
                    id="password"
                    className="border-2 h-[47px] border-gray-200 text-gray-800 font-semibold text-md outline-none rounded-lg focus:ring-gray-400 focus:border-gray-400 block w-full px-3.5 py-2.5"
                    required
                  />
                  {toggleReEnterPasswordVisibility ? (
                    <FaEyeSlash
                      className="absolute top-[25%] right-4 text-gray-600 text-xl"
                      onClick={() => {
                        setTogglereEnterPasswordVisibility((prev) => !prev);
                      }}
                    />
                  ) : (
                    <FaEye
                      className="absolute top-[25%] right-4 text-gray-600 text-xl"
                      onClick={() => {
                        setTogglereEnterPasswordVisibility((prev) => !prev);
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={updatePassAndNavigateToLogin}
              className="bg-[#8cd790] shadow-sm  h-[47px] text-[#fff] text-l font-semibold outline-none rounded-lg transition-all duration-200 hover:opacity-90 block w-full p-2.5"
            >
              Update
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

export default ChangePass;