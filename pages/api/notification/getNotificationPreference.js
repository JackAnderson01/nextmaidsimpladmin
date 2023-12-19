import GetNotificationPreferenceController from "../../../controllers/Notifications/GetNotificationPreferenceController.js";
import connection from "../../../lib/connection.js";

const getNotificationPreference = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await GetNotificationPreferenceController(req, res);
      break;
  }
};

export default getNotificationPreference;
