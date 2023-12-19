import React from 'react'

const ReviewsCard = () => {
  return (
    <div className='w-[48%] md:w-[32%] xl:w-[32.5%] h-auto p-4 flex flex-col gap-6 justify-between items-start rounded-[30px] bg-gray-100 '>
        <div className='w-full h-auto flex gap-3 justify-start items-center'>
            <img src="https://randomuser.me/api/portraits/men/15.jpg" alt="user" className='w-10 xl:w-12 h-10 xl:h-12 rounded-xl'/>
            <div className='w-auto flex flex-col justify-start items-start'>
                <h1 className='text-sm xl:text-lg font-bold text-black'>
                    Olivia James
                </h1>
                <span className='text-[#41c54e] text-xs xl:text-sm font-medium'>
                    Marked as completed
                </span>

            </div>

        </div>

        <span className='text-xs lg:w-[80%] xl:text-[16px] text-gray-800 font-medium'>
            Amazing Service I highly recommend everyone to buy this service.
        </span>

        <div className='w-full h-auto flex flex-col xl:flex-row justify-between items-center gap-2'>

            <div className='w-full xl:w-1/2 h-auto flex justify-start items-center  gap-1'>
            <div className="w-auto h-auto flex items-center justify-start mb-1 text-yellow-400">
              <svg
                className="w-3 h-3 xl:w-4 xl:h-4 me-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                className="w-3 h-3 xl:w-4 xl:h-4 me-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                className="w-3 h-3 xl:w-4 xl:h-4 me-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                className="w-3 h-3 xl:w-4 xl:h-4 me-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                className="w-3 h-3 xl:w-4 xl:h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            <span className='ml-2 text-md h-full flex items-center font-bold text-black'>
                4.8
            </span>
            </div>


            </div>

            <div className='w-full xl:w-1/2 h-auto flex justify-start items-center '>
                <button className='bg-[#8cd790] text-md w-1/2 h-10 rounded-full transition-all duration-200 hover:opacity-90 font-semibold text-white flex items-center justify-center'>
                    Approve
                </button>
                <button className=' text-md w-1/2 h-10 rounded-full font-semibold text-black hover:underline flex items-center justify-center'>
                    Decline
                </button>
            </div>

        </div>
    </div>
  )
}

export default ReviewsCard