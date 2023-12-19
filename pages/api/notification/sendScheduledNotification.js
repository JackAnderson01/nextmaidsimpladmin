import PostScheduledNotificationController from "../../../controllers/Notifications/PostScheduledNotificationController.js";
import connection from "../../../lib/connection.js";

const sendScheduledNotification = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await PostScheduledNotificationController(req, res);
      break;
  }
};

export default sendScheduledNotification;
