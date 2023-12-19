"use client"

import React, { useState } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from 'next/router';
import Link from 'next/link';

const ConfirmEmail = () => {

    const navigate = useRouter();


    const navigateToOTPVerification = () => {
        //Other functionality of verfication of creating the user to the backend and issuing a validation token:
        navigate.push("/auth/recovery/verifyotp/");
    }

    
  return (
    <div className='w-full h-auto min-h-screen relative flex justify-between items-center bg-white'>
        <div className='w-full lg:w-[45%] xl:w-[40%] h-full flex flex-col justify-start items-center gap-2 p-6 md:px-16 md:py-4 lg:py-8 lg:px-16'>

            {/* Top bar */}
            <div className='w-full h-[20%]  flex flex-row justify-between items-start'>

                {/* Logo */}
            <Link
              href="/"
              className="w-[40%] h-auto flex justify-start items-center"
            >
              {/* Image goes here */}
              {/* <img src="/logo.svg" alt="logo" className="w-36" /> */}
              <img src="/assets/loginlogo.svg" alt="Logo"/>
            </Link>


            </div>

            {/* Form and Form Fields: */}
            <div className='w-full h-[55%] mt-20  flex flex-col justify-center items-start gap-8'>

                <Link href="/auth/login/">
                <FaArrowLeft className='text-3xl '/>
                </Link>
                {/* Headings */}
                <div className='w-full h-[20%] flex flex-col justify-start items-start gap-2'>
                    <h1 className='text-5xl font-extrabold text-[#0e0e10]'>Forgot Password?</h1>
                    <span className='text-lg font-semibold text-gray-600'>Enter your registered email address to recover password.</span>
                </div>

                {/* Input fields */}
                <form className='w-full h-[70%] gap-6 flex flex-col items-start justify-start'>
                    <div className='w-full h-auto flex flex-col items-start justify-start gap-3'>

                        <div className='w-full h-auto'>
                            <label htmlFor="email" className="block mb-2 text-md text-gray-600 font-semibold">Email Address</label>
                            <input type="email" id="email" className="border-2 h-[47px] border-gray-200 text-gray-800 text-md outline-none rounded-lg focus:ring-gray-400 focus:border-gray-400 block w-full px-3.5 py-2.5" required/>
                        </div>


                    </div>
                    <button onClick={navigateToOTPVerification} className='bg-[#8cd790] shadow-sm  h-[47px] text-[#fff] text-l font-semibold outline-none rounded-lg transition-all duration-200 hover:opacity-90 block w-full p-2.5'>
                        Next
                    </button>
                </form>

            </div>


            

        </div>

        <div className="hidden lg:flex lg:w-[55%]  items-center pr-8 justify-center h-full">
          <img src="/assets/forgotpass.svg" alt="forgot_pass" className="w-full h-full" />
        </div>


    </div>
  )
}

export default ConfirmEmail