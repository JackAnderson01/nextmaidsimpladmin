import GetBookingByIdController from "../../../controllers/Booking/GetBookingByUserController.js";
import connection from "../../../lib/connection.js";

const getBookingById = async (req, res) => {
  await connection();

  const method = req.method;
  switch (method) {
    case "POST":
      await GetBookingByIdController(req, res);
      break;
  }
};

export default getBookingById;
