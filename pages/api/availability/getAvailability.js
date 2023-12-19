import GetAvailabilityController from "../../../controllers/Availability/GetAvailabilityController.js";
import connection from "../../../lib/connection.js";

const ServiceProviderAvailability = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result1 = await GetAvailabilityController(req, res);
      break;
  }
};

export default ServiceProviderAvailability;
