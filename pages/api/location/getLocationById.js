import GetLocationByIdController from "../../../controllers/Location/GetLocationByIdController.js";
import connection from "../../../lib/connection.js";

const getLocationById = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await GetLocationByIdController(req, res);
      break;
  }
};

export default getLocationById;
