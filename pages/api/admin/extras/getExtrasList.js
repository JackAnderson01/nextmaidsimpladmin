import GetExtrasController from "../../../../controllers/Admin/Extras/GetExtraController.js";
import connection from "../../../../lib/connection.js";

const getExtrasList = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "GET":
      let result1 = await GetExtrasController(req, res);
      break;
  }
};

export default getExtrasList;
