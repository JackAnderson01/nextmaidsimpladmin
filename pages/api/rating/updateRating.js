import ApproveRatingController from "../../../controllers/Admin/ApproveRatingController.js";
import connection from "../../../lib/connection.js";

const approveRating = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await ApproveRatingController(req, res);
      break;
  }
};

export default approveRating;
