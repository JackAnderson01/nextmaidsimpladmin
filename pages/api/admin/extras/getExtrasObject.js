import GetExtrasObjectController from "../../../../controllers/Admin/Extras/GetExtrasObjectController.js";
import connection from "../../../../lib/connection.js";

const getExtrasObject = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "GET":
      let result1 = await GetExtrasObjectController(req, res);
      break;
  }
};

export default getExtrasObject;
