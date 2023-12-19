import connection from "../../../lib/connection.js";
import PostRatingController from "../../../controllers/Rating/PostRatingController.js";

const postRating = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await PostRatingController(req, res);
      break;
  }
};

export default postRating;
