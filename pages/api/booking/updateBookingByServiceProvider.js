import UpdateBookingCleanerController from "../../../controllers/Booking/updateBookingCleanerController.js";
import connection from "../../../lib/connection.js";

const updateBookingsByServiceProviders = async (req, res) => {
  await connection();

  const method = req.method;
  switch (method) {
    case "POST":
      await UpdateBookingCleanerController(req, res);
      break;
  }
};

export default updateBookingsByServiceProviders;
