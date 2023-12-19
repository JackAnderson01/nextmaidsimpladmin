import ResumeSubscriptionController from "../../../controllers/Booking/ResumeSubscriptionController.js";
import connection from "../../../lib/connection.js";

const resumeSubscription = async (req, res) => {
  await connection();

  const method = req.method;
  switch (method) {
    case "POST":
      await ResumeSubscriptionController(req, res);
      break;
  }
};

export default resumeSubscription;
