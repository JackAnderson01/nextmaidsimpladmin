import GetHowOftensObjectController from "../../../../controllers/Admin/HowOften/GetHowOftensObjectController.js";
import connection from "../../../../lib/connection.js";

const getHowOftensObject = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "GET":
      let result1 = await GetHowOftensObjectController(req, res);
      break;
  }
};

export default getHowOftensObject;
