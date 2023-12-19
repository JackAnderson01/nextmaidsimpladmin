import GetRefundCompletedController from "../../../controllers/Admin/GetRefundCompletedController.js";
import connection from "../../../lib/connection.js";

const getCompletedRefund = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "GET":
      let result1 = await GetRefundCompletedController(req, res);
      break;
  }
};

export default getCompletedRefund;
