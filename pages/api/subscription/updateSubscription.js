import UpdateSubscriptionController from "../../../controllers/Booking/UpdateSubscriptionController.js";
import connection from "../../../lib/connection.js";

const updateSubscription = async (req, res) => {
  await connection();

  const method = req.method;
  switch (method) {
    case "POST":
      await UpdateSubscriptionController(req, res);
      break;
  }
};

export default updateSubscription;
