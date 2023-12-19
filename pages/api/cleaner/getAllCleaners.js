import GetCleanersController from "../../../controllers/Cleaner/GetCleanersController.js";
import connection from "../../../lib/connection.js";

const GetCleaners = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await GetCleanersController(req, res);
      break;
  }
};

export default GetCleaners;
