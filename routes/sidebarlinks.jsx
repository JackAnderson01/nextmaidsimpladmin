import { LuHome } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineCleaningServices } from "react-icons/md";
import { MdOutlinePriceChange } from "react-icons/md";
import { BiMoneyWithdraw } from "react-icons/bi";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { TbGitPullRequest } from "react-icons/tb";
import { IoBarChartOutline } from "react-icons/io5";

const sidebarlinks = [
    {
        'title': 'Home',
        'link': '/dashboard/home/',
        'icon': <LuHome />
    },
    {
        'title': 'Users',
        'link': '/dashboard/users/',
        'icon': <FaRegUser />
    },
    {
        'title': 'Cleaners',
        'link': '/dashboard/cleaners/',
        'icon': <MdOutlineCleaningServices />
    },
    {
        'title': 'Pricings',
        'link': '/dashboard/pricings/',
        'icon': <MdOutlinePriceChange />
    },
    {
        'title': 'Withdrawal Requests',
        'link': '/withdrawal-requests/',
        'icon': <BiMoneyWithdraw />
    },
    {
        'title': 'Manage Refunds',
        'link': '/manage-refunds/',
        'icon': <IoBarChartOutline />
    },
    {
        'title': 'Push Notification',
        'link': '/notifications/',
        'icon': <IoNotificationsOutline />
    },
    {
        'title': 'Bookings',
        'link': '/bookings/',
        'icon': <MdOutlineDateRange />
    },
    {
        'title': 'Reviews & Ratings',
        'link': '/reviews-and-ratings/',
        'icon': <FaRegStar />
    },
    {
        'title': 'Onboarding Requests',
        'link': '/onboarding-requests/',
        'icon': <TbGitPullRequest />
    },
    
]


export default sidebarlinks;