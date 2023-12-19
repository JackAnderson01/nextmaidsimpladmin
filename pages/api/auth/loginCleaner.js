import LoginCleanerController from "../../../controllers/ServiceProvider/LoginCleanerController.js";
import connection from "../../../lib/connection.js";

const loginCleaner = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await LoginCleanerController(req, res);
      break;
  }
};

export default loginCleaner;
