import GetBookingsByUserEmailController from "../../../controllers/Booking/GetBookingsByUserEmailController.js";
import connection from "../../../lib/connection.js";

const userBookings = async (req, res) => {
  await connection();

  const method = req.method;
  switch (method) {
    case "POST":
      await GetBookingsByUserEmailController(req, res);
      break;
  }
};

export default userBookings;
