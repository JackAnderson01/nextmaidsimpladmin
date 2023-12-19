import Cleaners from "../pages/dashboard/Cleaners";
import Home from "../pages/dashboard/Home";
import Users from "../pages/dashboard/Users";
import Pricings from "../pages/dashboard/Pricings"
import PushNotifications from "../pages/dashboard/PushNotifications";
import CreateNotifications from "../pages/dashboard/CreateNotifications";
import Bookings from "../pages/dashboard/Bookings";
import ReviewsAndRatings from "../pages/dashboard/ReviewsAndRatings";
import OnboardingRequests from "../pages/dashboard/OnboardingRequests";
import WithdrawalRequests from "../pages/dashboard/WithdrawalRequests";
import ManageRefunds from "../pages/dashboard/ManageRefunds";
import EditNotifications from "../pages/dashboard/EditNotifications";

const routes = [
    {
        'title': 'Home',
        'link': '/home/',
        'page': <Home />
    },
    {
        'title': 'Users',
        'link': '/users/',
        'page': <Users />
    },
    {
        'title': 'Cleaners',
        'link': '/cleaners/',
        'page': <Cleaners />
    },
    {
        'title': 'Pricings',
        'link': '/pricings/',
        'page': <Pricings />
    },
    {
        'title': 'Withdrawal Requests',
        'link': '/withdrawal-requests/',
        'page': <WithdrawalRequests />
    },
    {
        'title': 'Manage Refunds',
        'link': '/manage-refunds/',
        'page': <ManageRefunds />
    },
    {
        'title': 'Push Notifications',
        'link': '/notifications/',
        'page': <PushNotifications />
    },
    {
        'title': 'Create New Notifications',
        'link': '/notifications/create/',
        'page': <CreateNotifications />
    },
    {
        'title': 'Edit Notifications',
        'link': '/notifications/edit/',
        'page': <EditNotifications />
    },
    {
        'title': 'Bookings',
        'link': '/bookings/',
        'page': <Bookings />
    },
    {
        'title': 'Reviews & Ratings',
        'link': '/reviews-and-ratings/',
        'page': <ReviewsAndRatings />
    },
    {
        'title': 'Onboarding Requests',
        'link': '/onboarding-requests/',
        'page': <OnboardingRequests />
    },
    
];


export default routes