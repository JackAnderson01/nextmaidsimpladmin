import DeclineBookingByUserController from "../../../controllers/Booking/DeclineBookingByUserController.js";
import connection from "../../../lib/connection.js";

const declineBookingByUser = async (req, res) => {
  await connection();

  const method = req.method;
  switch (method) {
    case "POST":
      await DeclineBookingByUserController(req, res);
      break;
  }
};

export default declineBookingByUser;
