import PostNotificationByDeviceController from "../../../controllers/Notifications/PostNotificationByDevice.js";
import connection from "../../../lib/connection.js";

const sendNotificationByDevice = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await PostNotificationByDeviceController(req, res);
      break;
  }
};

export default sendNotificationByDevice;
