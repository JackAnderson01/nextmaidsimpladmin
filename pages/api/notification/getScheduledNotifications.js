import GetScheduledNotificationsController from "../../../controllers/Notifications/GetScheduledNotificationsController.js";
import connection from "../../../lib/connection.js";

const getScheduledNotifications = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "GET":
      let result = await GetScheduledNotificationsController(req, res);
      break;
  }
};

export default getScheduledNotifications;
