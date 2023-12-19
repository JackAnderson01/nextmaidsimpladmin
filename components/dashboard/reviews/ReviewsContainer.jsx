import React from "react";
import ReviewsCard from "./ReviewsCard";


const ReviewsContainer = () => {
    const dummyArr = [1,2,3,4,5,5,6,7,8,9,0,0,8,7]
  return (
    <div className="w-full  rounded-xl flex flex-col justify-start px-2 md:px-6 h-auto bg-white shadow-sm items-start">
      <div className="w-full h-auto flex flex-col justify-start items-start gap-2 ">
        <div className="w-full h-16 flex items-center  justify-start">
          <div className="text-2xl flex justify-start gap-1 items-center text-gray-900 font-semibold">
            <span>Buyer's Feedback</span>
            <span className="text-2xl text-gray-400">({50})</span>
          </div>
        </div>
      </div>

      
      <div className='w-full h-auto flex gap-2 justify-start items-start py-6 flex-wrap'>
        {
            dummyArr.map((item, key)=>{
                return(
                    <ReviewsCard key={key}/>
                )
            })
        }
      </div>
    </div>
  );
};

export default ReviewsContainer;
