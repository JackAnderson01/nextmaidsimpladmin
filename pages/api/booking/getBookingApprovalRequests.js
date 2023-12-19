import GetBookingApprovalRequestsController from "../../../controllers/Booking/GetBookingApprovalRequestsController.js";
import connection from "../../../lib/connection.js";

const getBookingApprovalRequests = async (req, res) => {
  await connection();

  const method = req.method;
  switch (method) {
    case "GET":
      await GetBookingApprovalRequestsController(req, res);
      break;
  }
};

export default getBookingApprovalRequests;
