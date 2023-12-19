import GetServiceTypesObjectController from "../../../../controllers/Admin/ServiceType/GetServiceTypesObjectController.js";
import connection from "../../../../lib/connection.js";

const getServiceTypesObject = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "GET":
      let result1 = await GetServiceTypesObjectController(req, res);
      break;
  }
};

export default getServiceTypesObject;
