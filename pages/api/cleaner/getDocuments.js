import GetCleanerDocumentsController from "../../../controllers/ServiceProvider/GetCleanerDocumentsController.js";
import connection from "../../../lib/connection.js";

const GetCleanerDocuments = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await GetCleanerDocumentsController(req, res);
      break;
  }
};

export default GetCleanerDocuments;
