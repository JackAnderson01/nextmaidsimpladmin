import GetCleanerDetailsWebController from "../../../controllers/Cleaner/GetCleanerDetailsWebController.js";
import connection from "../../../lib/connection.js";

const GetCleanerDetailsWeb = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await GetCleanerDetailsWebController(req, res);
      break;
  }
};

export default GetCleanerDetailsWeb;
