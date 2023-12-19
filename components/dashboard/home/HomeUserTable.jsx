import React from 'react'
import HomeUserTableHead from './HomeUserTableHead'
import HomrUserTableBody from './HomrUserTableBody'
import Link from 'next/link'


const HomeUserTable = () => {

    const dummyArr= [1,2,3,4,5,6,7,8]
  return (
    <div className='w-full lg:w-[50%] rounded-xl flex flex-col justify-start py-3 px-6 h-[30rem] bg-white shadow-sm items-start'>

        <div className='w-full h-16 flex items-center  justify-between'>
            <div className='text-2xl flex justify-start gap-1 items-center text-gray-900 font-semibold'>
                <span>
                Users
                </span>
                <span className='text-2xl text-gray-400'>
                    ({50})
                </span>
            </div>

            <Link href="/dashboard/cleaners/" className='text-md hover:underline text-[#3FB743]'>
                View All
            </Link>

        </div>

        <div className='w-full flex flex-col py-2 justify-start items-start'>
        <div className="relative overflow-x-auto w-full h-auto">
          <table className="w-full text-sm text-left rtl:text-right  text-gray-500 ">
            <HomeUserTableHead />
            {
                dummyArr.map((item, key)=> {
                    return(
                        <HomrUserTableBody key={key} />

                    )
                })
            }
            </table>
            </div>

        </div>
        
    </div>
  )
}

export default HomeUserTable