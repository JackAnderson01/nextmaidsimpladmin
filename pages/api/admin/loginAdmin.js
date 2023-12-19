import LoginAdminController from "../../../controllers/Authentication/LoginAdminController.js";
import connection from "../../../lib/connection.js";

const loginAdmin = async (req, res) => {
  await connection();

  if (req.method == "OPTIONS") {
    res.setHeader("Allow", "POST");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");

    return res.status(202).json({});
  }
  const method = req.method;
  switch (method) {
    case "POST":
      // res.setHeader("Allow", "POST");
      // res.setHeader("Access-Control-Allow-Origin", "*");
      // res.setHeader("Access-Control-Allow-Headers", "*");
      // res.setHeader("Access-Control-Allow-Methods", "*");
      let result = await LoginAdminController(req, res);
      return result;
      break;
  }
};

export default loginAdmin;
