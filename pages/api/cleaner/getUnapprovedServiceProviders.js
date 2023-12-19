import GetUnapprovedServiceProvidersController from "../../../controllers/ServiceProvider/GetUnapprovedServiceProvidersController.js";
import connection from "../../../lib/connection.js";

const GetUnapprovedServiceProviders = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await GetUnapprovedServiceProvidersController(req, res);
      break;
  }
};

export default GetUnapprovedServiceProviders;
