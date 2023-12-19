import GetServiceTypesController from "../../../../controllers/Admin/ServiceType/GetServiceTypeController.js";
import connection from "../../../../lib/connection.js";

const getServiceTypesList = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "GET":
      let result1 = await GetServiceTypesController(req, res);
      break;
  }
};

export default getServiceTypesList;
