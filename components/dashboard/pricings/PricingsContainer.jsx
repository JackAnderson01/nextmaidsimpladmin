import React from "react";
import Link from "next/link";



const PricingsContainer = () => {
  return (
    <div className="w-full  rounded-xl flex flex-col justify-start px-6 py-4 h-auto bg-white shadow-sm items-start">
      <div className="w-full h-16 flex items-center  justify-between">
        <div className="text-2xl flex justify-start gap-1 items-center text-gray-900 font-semibold">
          <span>Pricings</span>
        </div>
      </div>

      <form className="w-full flex flex-col gap-6 justify-start items-start">
        <div className="w-full h-auto flex flex-col justify-start gap-6  items-start md:flex-row">
          <div className="w-full md:w-1/2 h-auto">
            <label
              htmlFor="package"
              className="block mb-2  text-md text-gray-600 font-semibold"
            >
              Package
            </label>
            <select
              name="package"
              id="package"
              className="border-2 h-[47px] border-gray-200 text-gray-800 text-lg font-medium outline-none rounded-lg focus:ring-gray-400 focus:border-gray-400 block w-full px-3.5 py-2.5"
            >
              <option value="deep_clean">Deep Clean</option>
              <option value="base_clean">Base Clean</option>
            </select>
          </div>
          <div className="w-full md:w-1/2 h-auto">
            <label
              htmlFor="base_price"
              className="block mb-2  text-md text-gray-600 font-semibold"
            >
              Base Price
            </label>
            <input
              type="text"
              id="base_price"
              placeholder="$500.00"
              className="border-2 h-[47px] border-gray-200 text-gray-800 text-lg font-medium outline-none rounded-lg focus:ring-gray-400 focus:border-gray-400 block w-full px-3.5 py-2.5"
              required
            />
          </div>
        </div>

        <div className="w-full h-auto flex flex-col gap-6 justify-start items-start">
          <div className="text-2xl flex justify-start gap-1 items-center text-gray-900 font-semibold">
            <span>Package Includes</span>
          </div>

          <div className="w-full h-auto flex flex-col justify-start gap-6  items-start md:flex-row">
            <div className="w-full md:w-1/3 h-auto">
              <label
                htmlFor="bedrooms"
                className="block mb-2  text-md text-gray-600 font-semibold"
              >
                Bedrooms
              </label>
              <input
                placeholder="$500.00"
                type="text"
                id="bedrooms"
                className="text-lg font-medium border-2 h-[47px] border-gray-200 text-gray-800 text-md outline-none rounded-lg focus:ring-gray-400 focus:border-gray-400 block w-full px-3.5 py-2.5"
                required
              />
            </div>
            <div className="w-full md:w-1/3 h-auto">
              <label
                htmlFor="bathrooms"
                className="block mb-2  text-md text-gray-600 font-semibold"
              >
                Bathrooms
              </label>
              <input
                placeholder="$500.00"
                type="text"
                id="bathrooms"
                className="text-lg font-medium border-2 h-[47px] border-gray-200 text-gray-800 text-md outline-none rounded-lg focus:ring-gray-400 focus:border-gray-400 block w-full px-3.5 py-2.5"
                required
              />
            </div>
            <div className="w-full md:w-1/3 h-auto">
              <label
                htmlFor="half_bath"
                className="block mb-2  text-md text-gray-600 font-semibold"
              >
                Half Baths
              </label>
              <input
                placeholder="$500.00"
                type="text"
                id="half_bath"
                className="text-lg font-medium border-2 h-[47px] border-gray-200 text-gray-800 text-md outline-none rounded-lg focus:ring-gray-400 focus:border-gray-400 block w-full px-3.5 py-2.5"
                required
              />
            </div>
          </div>

          <div className="w-full h-auto flex flex-col justify-start gap-6  items-start md:flex-row">
            <div className="w-full md:w-1/2 h-auto">
              <label
                htmlFor="kitchens"
                className="block mb-2  text-md text-gray-600 font-semibold"
              >
                Kitchens
              </label>
              <input
                placeholder="$500.00"
                type="text"
                id="kitchens"
                className="text-lg font-medium border-2 h-[47px] border-gray-200 text-gray-800 text-md outline-none rounded-lg focus:ring-gray-400 focus:border-gray-400 block w-full px-3.5 py-2.5"
                required
              />
            </div>
            <div className="w-full md:w-1/2 h-auto">
              <label
                htmlFor="living_room"
                className="block mb-2  text-md text-gray-600 font-semibold"
              >
                Living Room
              </label>
              <input
                placeholder="$500.00"
                type="text"
                id="living_room"
                className="text-lg font-medium border-2 h-[47px] border-gray-200 text-gray-800 text-md outline-none rounded-lg focus:ring-gray-400 focus:border-gray-400 block w-full px-3.5 py-2.5"
                required
              />
            </div>
          </div>
        </div>

        <div className="w-full h-auto mt-6 flex justify-start items-center gap-2">
          <button className="w-40 h-12 rounded-xl flex items-center justify-center font-bold text-white bg-green-600 outline-none transition-all duration-150 hover:opacity-90 ">
            Save
          </button>

          <Link
            href="/home/"
            className="w-40 h-12 rounded-xl flex items-center justify-center font-bold text-white bg-[#1c1c1c] outline-none transition-all duration-150 hover:opacity-90 "
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default PricingsContainer;
