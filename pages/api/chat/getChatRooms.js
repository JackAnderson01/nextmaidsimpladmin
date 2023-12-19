import GetChatRoomsController from "../../../controllers/Firebase/Chat/GetChatRoomsController.js";
import connection from "../../../lib/connection.js";

const getChatRooms = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await GetChatRoomsController(req, res);
      break;
  }
};

export default getChatRooms;
