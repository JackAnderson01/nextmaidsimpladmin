import GetHowOftensController from "../../../../controllers/Admin/HowOften/GetHowOftensController.js";
import connection from "../../../../lib/connection.js";

const getHowOftensList = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "GET":
      let result1 = await GetHowOftensController(req, res);
      break;
  }
};

export default getHowOftensList;
