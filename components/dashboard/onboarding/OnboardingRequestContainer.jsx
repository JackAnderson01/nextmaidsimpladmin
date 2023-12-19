import React from 'react'
import { IoSearch } from "react-icons/io5";
import OnboardingRequestCard from './OnboardingRequestCard';


const OnboardingRequestContainer = () => {
    const dummyArr =[1,2,3,4,5,6,6,7,88,9,0];
  return (
    <div className="w-full  rounded-xl flex flex-col justify-start px-2 md:px-6 h-auto bg-white shadow-sm items-start">
      <div className="w-full h-auto flex flex-col justify-start items-start gap-2 ">
        <div className="w-full h-16 flex items-center  justify-start">
          <div className="text-2xl flex justify-start gap-1 items-center text-gray-900 font-semibold">
            <span>Buyer's Feedback</span>
            <span className="text-2xl text-gray-400">({50})</span>
          </div>
        </div>

        <div className='w-full h-auto rounded-lg relative'>
            <input type="text" className='w-full rounded-lg px-3 h-10 bg-gray-100 text-lg font-medium outline-none border border-gray-500 focus-within:ring-2 focus-within:ring-[#8cd790]' placeholder='Search' />
            <button className='w-12 h-8 absolute top-1 right-1 flex items-center justify-center bg-[#8cd790] rounded-md text-white'>
                <IoSearch />
            </button>
        </div>
      </div>

      
      <div className='w-full h-auto flex gap-2 justify-start items-start py-6 flex-wrap'>
        {
            dummyArr.map((item, key)=>{
                return(

                    <OnboardingRequestCard key={key} />
                )
            })
        }
        </div>
    </div>
  )
}

export default OnboardingRequestContainer