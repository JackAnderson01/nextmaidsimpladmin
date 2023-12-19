import GetUserByEmailController from "../../../controllers/Users/GetUserByEmailController.js";
import connection from "../../../lib/connection.js";

const GetUserByEmail = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await GetUserByEmailController(req, res);
      break;
  }
};

export default GetUserByEmail;
