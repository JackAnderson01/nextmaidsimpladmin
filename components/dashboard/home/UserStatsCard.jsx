import React from 'react'

const UserStatsCard = ({stats, type}) => {
  return (
    <div className='w-1/2 md:w-60 h-24 rounded-[30px] bg-white shadow-sm flex p-4 justify-start gap-3 items-center'>

        <img src="/assets/greenuser.svg" alt="icon" />

        <div className='w-auto h-auto flex flex-col  justify-start items-start'>
            <h1 className='text-xl font-bold text-gray-900'>
                {stats}+
            </h1>
            <span className='text-sm md:text-lg font-medium text-gray-600'>
                Total {type}
            </span>

        </div>
        
    </div>
  )
}

export default UserStatsCard