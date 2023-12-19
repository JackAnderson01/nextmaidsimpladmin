import PostAvailabilityController from "../../../controllers/Availability/PostAvailabilityController.js";
import connection from "../../../lib/connection.js";

const Availability = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await PostAvailabilityController(req, res);
      break;
  }
};

export default Availability;
