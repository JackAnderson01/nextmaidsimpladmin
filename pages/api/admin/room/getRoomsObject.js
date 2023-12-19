import GetRoomsObjectController from "../../../../controllers/Admin/Rooms/GetRoomsObjectController.js";
import connection from "../../../../lib/connection.js";

const getRoomsObject = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result1 = await GetRoomsObjectController(req, res);
      break;
  }
};

export default getRoomsObject;
