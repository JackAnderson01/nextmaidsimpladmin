"use client"

import React from "react";
import UserTable from "./UserTable";

const Users = () => {
  return (
    <div className="w-full  h-auto flex flex-col gap-4 justify-start items-start overflow-y-auto p-2 md:p-4">
      <UserTable />
    </div>
  );
};

export default Users;