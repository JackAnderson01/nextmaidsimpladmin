import React from 'react'

const OnboardingRequestCard = () => {
  return (
    <div className='w-[48%] md:w-[32%] xl:w-[19.3%] h-auto p-4 flex flex-col gap-6 justify-between items-start rounded-[30px] bg-gray-100 '>
    <div className='w-full h-auto flex gap-3 justify-start items-center'>
        <img src="https://randomuser.me/api/portraits/men/15.jpg" alt="user" className='w-10 xl:w-12 h-10 xl:h-12 rounded-xl'/>
        <div className='w-auto flex flex-col justify-start items-start'>
            <h1 className='text-sm xl:text-lg font-bold text-black'>
                Olivia James
            </h1>
            <span className='text-[#9b9c9b] text-sm xl:text-sm font-medium'>
                @oliviajames
            </span>

        </div>

    </div>


    <div className='w-full h-auto flex flex-row justify-end items-center gap-2'>

        <div className='w-full h-auto flex justify-start items-center gap-2'>
            <button className='bg-[#8cd790] text-md w-1/2 h-10 rounded-full transition-all duration-200 hover:opacity-90 font-semibold text-white flex items-center justify-center'>
                Approve
            </button>
            <button className='bg-white  text-md w-1/2 h-10 rounded-full font-semibold text-black hover:opacity-90 flex items-center justify-center'>
                Decline
            </button>
        </div>

    </div>
</div>
  )
}

export default OnboardingRequestCard