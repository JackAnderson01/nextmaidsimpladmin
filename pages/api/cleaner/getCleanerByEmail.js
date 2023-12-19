import GetCleanerByEmailController from "../../../controllers/ServiceProvider/GetCleanerByEmailController.js";
import connection from "../../../lib/connection.js";

const GetCleanerByEmail = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await GetCleanerByEmailController(req, res);
      break;
  }
};

export default GetCleanerByEmail;
