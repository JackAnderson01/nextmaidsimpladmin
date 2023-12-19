import PostNotificationsByEmailController from "../../../controllers/Notifications/PostNotificationsByEmailController.js";
import connection from "../../../lib/connection.js";

const sendNotificationByEmail = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await PostNotificationsByEmailController(req, res);
      break;
  }
};

export default sendNotificationByEmail;
