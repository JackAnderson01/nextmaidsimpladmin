import PostExtraController from "../../../../controllers/Admin/Extras/PostExtraController.js";
import connection from "../../../../lib/connection.js";

const postExtras = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result1 = await PostExtraController(req, res);
      break;
  }
};

export default postExtras;
