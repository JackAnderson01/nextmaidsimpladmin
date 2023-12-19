import PostNotificationsByAudienceController from "../../../controllers/Notifications/PostNotificationsByAudienceController.js";
import connection from "../../../lib/connection.js";

const sendNotificationByAudience = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await PostNotificationsByAudienceController(req, res);
      break;
  }
};

export default sendNotificationByAudience;
