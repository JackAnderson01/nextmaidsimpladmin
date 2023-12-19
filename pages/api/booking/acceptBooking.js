import AcceptBookingController from "../../../controllers/Booking/AcceptBookingController.js";
import connection from "../../../lib/connection.js";

const acceptBooking = async (req, res) => {
  await connection();

  const method = req.method;
  switch (method) {
    case "POST":
      await AcceptBookingController(req, res);
      break;
  }
};

export default acceptBooking;
