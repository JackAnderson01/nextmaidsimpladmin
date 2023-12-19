import GetSignUpCountsController from "../../../controllers/Admin/GetSignUpCountsController.js";
import connection from "../../../lib/connection.js";

const getSignUpCounts = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "GET":
      let result = await GetSignUpCountsController(req, res);
      break;
  }
};

export default getSignUpCounts;
