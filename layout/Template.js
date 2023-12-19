import React from 'react'
import Navbar from '../components/dashboard/global/Navbar';
import Sidebar from '../components/dashboard/global/Sidebar';

const Template = ({page}) => {
    const toggleSidebar = () => {
        const sidebar = document.getElementById('sidebar');
        sidebar?.classList.remove('translate-x-0');
        sidebar?.classList.add('-translate-x-full');
    
      }
    return (
        <div className='w-screen h-screen flex justify-start items-start'>
        <Sidebar />

        <div className='w-full lg:w-[calc(100%-15rem)] h-full bg-gray-50 flex flex-col justify-start items-start'>
            
            <Navbar />

            <div onClick={toggleSidebar} className='w-full  h-[calc(100%-4rem)] overflow-y-auto flex flex-col justify-start items-start '>
                {page}
            </div>

        </div>
        
    </div>
    )
}

export default Template