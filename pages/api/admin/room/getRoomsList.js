import GetRoomsController from "../../../../controllers/Admin/Rooms/GetRoomController.js";
import connection from "../../../../lib/connection.js";

const getRoomsList = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result1 = await GetRoomsController(req, res);
      break;
  }
};

export default getRoomsList;
