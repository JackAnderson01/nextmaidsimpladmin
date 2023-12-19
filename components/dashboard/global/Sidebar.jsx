import React from "react";
import SidebarLink from "./SidebarLink";
import sidebarlinks from "../../../routes/sidebarlinks"
import {CgMenuLeftAlt} from "react-icons/cg";
import { PiSignOutBold } from "react-icons/pi";
import Link from "next/link";
import { useRouter } from "next/router";


const Sidebar = () => {

  const navigate = useRouter();

  const closeSidebar = () => {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.add("-translate-x-full");
    sidebar.classList.remove("translate-x-0");
    
  };


  const LogMeOut = () => {


    // Other Functions:
    navigate.push('/auth/login/')
  }

  return (
    <div id="sidebar" className="fixed top-0 left-0 -translate-x-full lg:translate-x-0 transition-all duration-150 z-50 px-3 shadow-md py-6 lg:static w-80 h-full flex flex-col justify-start items-center gap-2 bg-white ">

      <button onClick={closeSidebar} className=' absolute top-3 left-2 w-10 h-10 flex lg:hidden items-center justify-center outline-none border-none text-2xl'>
        <CgMenuLeftAlt className='text-[#8cd790]'/>
      </button>

      <Link href="/home/" className="mb-4">
        <img src="/assets/loginlogo.svg" alt="logo" />
      </Link>

      <div className="w-full h-full overflow-y-auto">
        {sidebarlinks.map((obj, key) => {
          return <SidebarLink key={key} obj={obj} />;
        })}

      <button onClick={LogMeOut} className="w-full h-14 rounded-xl mb-1 px-4 flex justify-start text-gray-700 focus-within:bg-[#8cd790] text-2xl focus-within:text-white items-center gap-4">

        <PiSignOutBold />
      <span className='text-lg font-medium '>
            Signout
        </span>
      </button>
      </div>
    </div>
  );
};

export default Sidebar;
