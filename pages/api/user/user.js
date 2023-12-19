import PostUserController from "../../../controllers/Users/PostUserController.js";
import connection from "../../../lib/connection.js";

const postUserData = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await PostUserController(req, res);
      break;
  }
};

export default postUserData;
