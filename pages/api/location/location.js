import PostLocationController from "../../../controllers/Location/PostLocationController.js";
import connection from "../../../lib/connection.js";

const location = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await PostLocationController(req, res);
      break;
  }
};

export default location;
