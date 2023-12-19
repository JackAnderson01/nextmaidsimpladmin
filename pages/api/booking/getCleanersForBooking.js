import GetServiceProviderByLocationController from "../../../controllers/ServiceProvider/GetServiceProviderByLocationController.js";
import connection from "../../../lib/connection.js";

const getCleanersForBooking = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await GetServiceProviderByLocationController(req, res);
      break;
  }
};

export default getCleanersForBooking;
