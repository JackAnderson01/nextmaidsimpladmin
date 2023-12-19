import GetUnassignedBookingsController from "../../../controllers/Booking/GetUnassignedBookingsController.js";
import connection from "../../../lib/connection.js";

const getUnassignedBookings = async (req, res) => {
  await connection();

  const method = req.method;
  switch (method) {
    case "POST":
      await GetUnassignedBookingsController(req, res);
      break;
  }
};

export default getUnassignedBookings;
