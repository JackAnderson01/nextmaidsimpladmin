import GetRatingsByUserEmailController from "../../../controllers/Rating/GetRatingsByUserEmailController.js";
import connection from "../../../lib/connection.js";

const getRatingsByUserEmail = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let email = await GetRatingsByUserEmailController(req, res);
      break;
  }
};

export default getRatingsByUserEmail;
