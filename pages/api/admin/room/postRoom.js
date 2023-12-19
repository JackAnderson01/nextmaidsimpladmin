import PostRoomController from "../../../../controllers/Admin/Rooms/PostRoomController.js";
import connection from "../../../../lib/connection.js";

const postRoom = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result1 = await PostRoomController(req, res);
      break;
  }
};

export default postRoom;
