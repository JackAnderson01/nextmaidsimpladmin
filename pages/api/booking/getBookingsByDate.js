import GetBookingsByDateController from "../../../controllers/Booking/GetBookingsByDateController.js";
import connection from "../../../lib/connection.js";

const serviceProviderBookingsByDate = async (req, res) => {
  await connection();

  const method = req.method;
  switch (method) {
    case "POST":
      await GetBookingsByDateController(req, res);
      break;
  }
};

export default serviceProviderBookingsByDate;
