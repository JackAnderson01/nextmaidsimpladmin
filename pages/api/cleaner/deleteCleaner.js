import DeleteCleanerController from "../../../controllers/Cleaner/DeleteCleanerController.js";
import connection from "../../../lib/connection.js";

const DeleteCleaner = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await DeleteCleanerController(req, res);
      break;
  }
};

export default DeleteCleaner;
