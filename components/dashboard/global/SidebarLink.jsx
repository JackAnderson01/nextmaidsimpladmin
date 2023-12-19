import React from 'react'
import Link from 'next/link'

const SidebarLink = ({obj}) => {
  return (
    <Link href={obj.link} className='w-full h-14 rounded-xl mb-1 px-4 flex justify-start text-gray-700 focus-within:bg-[#8cd790] text-2xl focus-within:text-white items-center gap-4'>

        {obj.icon}
        
        <span className='text-lg font-medium '>
            {obj.title}
        </span>
    </Link>
  )
}

export default SidebarLink