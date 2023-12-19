import GetNotificationsController from "../../../controllers/Notifications/GetNotificationsController.js";
import connection from "../../../lib/connection.js";

const getNotifications = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await GetNotificationsController(req, res);
      break;
  }
};

export default getNotifications;
