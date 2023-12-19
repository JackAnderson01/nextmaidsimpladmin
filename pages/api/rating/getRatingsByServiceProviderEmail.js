import GetRatingsByServiceProviderEmailController from "../../../controllers/Rating/GetRatingsByServiceProviderEmailController.js";
import connection from "../../../lib/connection.js";

const getRatingsByServiceProviderEmail = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let email = await GetRatingsByServiceProviderEmailController(req, res);
      break;
  }
};

export default getRatingsByServiceProviderEmail;
