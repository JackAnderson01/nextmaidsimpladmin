import React from "react";
import { CiEdit } from "react-icons/ci";
import NotificationStatusBadge from "./NotificationStatusBadge";
import {Link} from "react-router-dom"

const NotificationTableBody = () => {
  return (
    <tbody className="border ">
      <tr className="bg-white border-b ">
        <th
          scope="row"
          className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap"
        >
          Notification Title goes here
        </th>
        <td className="px-6 py-3">MM/DD/YYYY</td>

        <td className="p-2">
          <NotificationStatusBadge status={"delivered"} />
        </td>
        <td className="px-6 py-3">
          <Link to="/notifications/edit/" className="text-sm text-[#1badff] ">
            <CiEdit className="text-xl" />
          </Link>
        </td>
      </tr>
    </tbody>
  );
};

export default NotificationTableBody;
