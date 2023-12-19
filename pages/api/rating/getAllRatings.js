import GetRatingsController from "../../../controllers/Rating/GetRatingsController.js";
import connection from "../../../lib/connection.js";

const getAllRatings = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await GetRatingsController(req, res);
      break;
  }
};

export default getAllRatings;
