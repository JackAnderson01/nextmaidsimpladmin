import GetSubscriptionsController from "../../../controllers/Booking/GetSubscriptionsController.js";
import connection from "../../../lib/connection.js";

const getSubscriptions = async (req, res) => {
  await connection();

  const method = req.method;
  switch (method) {
    case "POST":
      await GetSubscriptionsController(req, res);
      break;
  }
};

export default getSubscriptions;
