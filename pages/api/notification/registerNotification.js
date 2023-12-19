import RegisterNotificationController from "../../../controllers/Notifications/RegisterNotificationController.js";
import connection from "../../../lib/connection.js";

const registerNotification = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await RegisterNotificationController(req, res);
      break;
  }
};

export default registerNotification;
