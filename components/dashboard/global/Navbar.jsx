import React from 'react'
import { CgMenuLeftAlt } from "react-icons/cg";

const Navbar = () => {

  const openSidebar = () => {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.remove("-translate-x-full");
    sidebar.classList.add("translate-x-0");
    
  };


  return (
    <div className='w-full z-40 flex items-center justify-between px-6 lg:justify-end h-16 shadow-md bg-white'>

      <button onClick={openSidebar} className='w-auto h-auto flex lg:hidden items-center justify-center outline-none border-none text-2xl'>
        <CgMenuLeftAlt className='text-[#8cd790]'/>
      </button>

      <div className='w-auto h-14 flex justify-start gap-2 items-center'>

        <img src="https://randomuser.me/api/portraits/men/57.jpg" alt="admin-img" className='w-9 h-9 rounded-lg'/>

        <div className='w-auto flex flex-col justify-start items-start'>
          <span className='text-xs text-gray-500 font-medium'>
            Welcome Back,
          </span>

          <span className='text-sm  text-gray-900 font-semibold'>
            Jane Doe
          </span>
        </div>

      </div>
        
    </div>
  )
}

export default Navbar