import GetLocationsByEmailController from "../../../controllers/Location/GetLocationsByEmailController.js";
import connection from "../../../lib/connection.js";

const getLocationsByEmail = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await GetLocationsByEmailController(req, res);
      break;
  }
};

export default getLocationsByEmail;
