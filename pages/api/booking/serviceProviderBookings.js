import GetBookingsByServiceProviderEmailController from "../../../controllers/Booking/GetBookingsByServiceProvider.js";
import GetUnassignedBookingsController from "../../../controllers/Booking/GetUnassignedBookingsController.js";
import connection from "../../../lib/connection.js";

const serviceProviderBookings = async (req, res) => {
  await connection();

  const method = req.method;
  switch (method) {
    case "POST":
      await GetBookingsByServiceProviderEmailController(req, res);
      break;
    case "GET":
      await GetUnassignedBookingsController(req, res);
      break;
  }
};

export default serviceProviderBookings;
