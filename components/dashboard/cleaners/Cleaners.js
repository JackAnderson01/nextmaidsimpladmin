"use client"

import React from "react";
import CleanerTable from "./CleanerTable";

const Cleaners = () => {
  return (
    <div className="w-full  h-auto flex flex-col gap-4 justify-start items-start overflow-y-auto p-2 md:p-4">
      <CleanerTable />
    </div>
  );
};

export default Cleaners;