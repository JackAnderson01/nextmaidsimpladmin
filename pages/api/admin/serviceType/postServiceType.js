import PostServiceTypeController from "../../../../controllers/Admin/ServiceType/PostServiceTypeController.js";
import connection from "../../../../lib/connection.js";

const postServiceType = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result1 = await PostServiceTypeController(req, res);
      break;
  }
};

export default postServiceType;
