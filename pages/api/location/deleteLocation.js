import deleteLocationController from "../../../controllers/Location/DeleteLocationController.js";
import connection from "../../../lib/connection.js";

const deleteLocation = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await deleteLocationController(req, res);
      break;
  }
};

export default deleteLocation;
