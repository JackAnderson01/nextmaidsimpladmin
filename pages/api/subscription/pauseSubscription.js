import PauseSubscriptionController from "../../../controllers/Booking/PauseSubscriptionController.js";
import connection from "../../../lib/connection.js";

const pauseSubscription = async (req, res) => {
  await connection();

  const method = req.method;
  switch (method) {
    case "POST":
      await PauseSubscriptionController(req, res);
      break;
  }
};

export default pauseSubscription;
