import GetUnapproveRatingsController from "../../../controllers/Rating/GetUnapprovedRatingsController.js";
import connection from "../../../lib/connection.js";

const getUnapprovedRatings = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await GetUnapproveRatingsController(req, res);
      break;
  }
};

export default getUnapprovedRatings;
