import ApproveBookingController from "../../../controllers/Admin/ApproveBookingRequestsController.js";
import connection from "../../../lib/connection.js";

const approveBooking = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await ApproveBookingController(req, res);
      break;
  }
};

export default approveBooking;
