import GetUsersController from "../../../controllers/Users/GetUsersController.js";
import connection from "../../../lib/connection.js";

const getAllUsers = async (req, res) => {
  await connection();

  // if (req.method == "OPTIONS") {
  //   res.setHeader("Allow", "POST");
  //   res.setHeader("Access-Control-Allow-Origin", "*");
  //   res.setHeader("Access-Control-Allow-Headers", "*");
  //   res.setHeader("Access-Control-Allow-Methods", "*");

  //   return res.status(202).json({});
  // }

  const method = req.method;
  switch (method) {
    case "POST":
      let result1 = await GetUsersController(req, res);
      break;
  }
};

export default getAllUsers;
