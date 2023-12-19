import GetCurrentUpdatesController from "../../../controllers/Users/GetCurrentUpdatesController.js";
import connection from "../../../lib/connection.js";

const getCurrentUpdates = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await GetCurrentUpdatesController(req, res);
      break;
  }
};

export default getCurrentUpdates;
