import React from 'react'
import { IoSearchOutline } from "react-icons/io5";
import UserTableHead from './UserTableHead';
import UserTableBody from './UserTableBody';
import DeleteModal from '../global/DeleteModal';
import BlockModal from '../global/BlockModal';
const UserTable = () => {

    const dummyArr = [1,2,3,4,5,6,7,8,9,10,11,12,2,3,4]
  return (
    <div className="w-full  rounded-xl flex flex-col justify-start px-6 h-auto bg-white shadow-sm items-start">
        <div className="w-full h-16 flex items-center  justify-between">
          <div className="text-2xl flex justify-start gap-1 items-center text-gray-900 font-semibold">
            <span>Users</span>
            <span className="text-2xl text-gray-400">({50})</span>
          </div>

          <div className="w-40 h-10 md:w-60 md:h-12 relative">
            <input
              type="text"
              className="w-full h-full rounded-xl bg-gray-100 border border-gray-400 outline-none focus:ring-2 focus:ring-[#8cd790]   px-3"
              placeholder="Search"
            />
            <button className="w-10 h-[80%] bg-[#8cd790] text-white outline-none border-none focus:bg-green-400 flex items-center justify-center absolute top-1 right-1 rounded-lg">
              <IoSearchOutline className="text-2xl" />
            </button>
          </div>
        </div>
        
        <div className='w-full flex flex-col py-4 lg:px-2 justify-start items-start'>
        <div className="relative overflow-x-auto w-full h-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <UserTableHead />
            {
                dummyArr.map((item, key)=> {
                    return(
                        <UserTableBody key={key} />

                    )
                })
            }
            </table>
            <DeleteModal />
            <BlockModal />
            </div>

        </div>
      </div>
  )
}

export default UserTable