import DeclineBookingByCleanerController from "../../../controllers/Booking/DeclineBookingByCleanerController.js";
import connection from "../../../lib/connection.js";

const declineBooking = async (req, res) => {
  await connection();

  const method = req.method;
  switch (method) {
    case "POST":
      await DeclineBookingByCleanerController(req, res);
      break;
  }
};

export default declineBooking;
