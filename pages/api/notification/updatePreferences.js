import UpdatePreferencesController from "../../../controllers/Notifications/UpdatePreferencesController.js";
import connection from "../../../lib/connection.js";

const updatePreferences = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await UpdatePreferencesController(req, res);
      break;
  }
};

export default updatePreferences;
