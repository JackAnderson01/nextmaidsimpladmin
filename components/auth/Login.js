"use client"

import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import {AppContext} from "../../context/context";


const Login = () => {


    const {isLoggedIn, setIsLoggedIn} = useContext(AppContext)
    const navigate = useRouter();

    const initialFormData = Object.freeze({
      email: "",
      password: "",
    });
  
    const [formData, setFormData] = useState(initialFormData);
  
    const handleChange = (e) => {
      setFormData((prevData) => ({
        ...prevData,
        // trimming the whitespaces from the value
        [e.target.name]: e.target.value.trim(),
      }));
    };
  
    const handleLoginSubmit = async (e) => {
      e.preventDefault();
  
      axios
        .post("/api/admin/loginAdmin", {
          email: formData.email,
          password: formData.password,
        })
        .then(
          (response) => {
            console.log(response);
  
            localStorage.setItem("token", response.data.token);
            navigate.push("/dashboard/home/");
          },
          (error) => {
            console.log(error);
          }
        );
    };
  
    function checkLogin() {
      const token = localStorage.getItem("token");
      if (token) {
        return true;
      } else {
        return false;
      }
    }
    useEffect(() => {
      const isLoggedIn = checkLogin();
      if (isLoggedIn) {
        navigate.push("/dashboard/home/");
        console.log("Logged In")
      }
    }, []);
  
    const [togglePasswordVisibility, setTogglePasswordVisibility] =
      useState(false);
    return (
      <div className="w-screen h-auto min-h-screen relative flex justify-between items-center bg-white">
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
              <img src="/assets/loginlogo.svg"  alt="Logo"/>
            </Link>
          </div>
  
          {/* Form and Form Fields: */}
          <div className="w-full h-[55%] mt-20  flex flex-col justify-center items-start gap-8">
            {/* Headings */}
            <div className="w-full h-[20%] flex flex-col justify-start items-start gap-2">
              <h1 className="text-5xl font-extrabold text-[#0e0e10]">Login</h1>
              <span className="text-lg font-semibold text-gray-600">
                Enter below details to login.
              </span>
            </div>
  
            {/* Input fields */}
            <form className="w-full h-[70%] gap-6 flex flex-col items-start justify-start">
              <div className="w-full h-auto flex flex-col items-start justify-start gap-3">
                <div className="w-full h-auto">
                  <label
                    htmlFor="email"
                    className="block mb-2  text-md text-gray-600 font-semibold"
                  >
                    Email Address
                  </label>
                  <input
                    onChange={handleChange}
                    type="email"
                    id="email"
                    name="email"
                    className="border-2 h-[47px] border-gray-200 text-gray-800 text-md outline-none rounded-lg focus:ring-gray-400 focus:border-gray-400 block w-full px-3.5 py-2.5"
                    required
                  />
                </div>
  
                <div className="w-full h-auto">
                  <label
                    htmlFor="password"
                    className="block mb-2  text-md text-gray-600 font-semibold"
                  >
                    Password
                  </label>
                  <div className="w-full h-full relative">
                    <input
                      name="password"
                      onChange={handleChange}
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
              </div>
              <button
                type="submit"
                onClick={handleLoginSubmit}
                className="bg-[#8cd790] shadow-sm  h-[47px] text-[#fff] text-l font-semibold outline-none rounded-lg transition-all duration-200 hover:opacity-90 block w-full p-2.5"
              >
                Sign In
              </button>
            </form>
          </div>
  
          {/* Forgot password */}
          <div className="w-full h-auto my-4 flex justify-center items-center">
            <Link
              href="/auth/recovery/confirmemail/"
              className="text-lg font-semibold text-gray-600 transition-all duration-100 hover:text-[#8CD790]"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
  
        <div className="hidden lg:flex lg:w-[55%]  items-center pr-8 justify-center h-full">
          <img src="/assets/loginbanner.svg" alt="login_banner" className="w-full h-full" />
        </div>
      </div>
    )
}

export default Login