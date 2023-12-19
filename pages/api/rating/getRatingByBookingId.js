import GetRatingByBookingIdController from "../../../controllers/Rating/GetRatingByBookingIdController.js";
import connection from "../../../lib/connection.js";

const getRatingByBookingId = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let email = await GetRatingByBookingIdController(req, res);
      break;
  }
};

export default getRatingByBookingId;
