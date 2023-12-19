import GetRefundRequestsController from "../../../controllers/Admin/GetRefundRequestsController.js";
import RefundCompletedController from "../../../controllers/Admin/RefundCompletedController.js";
import connection from "../../../lib/connection.js";

const refund = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await RefundCompletedController(req, res);
      break;
    case "GET":
      let result1 = await GetRefundRequestsController(req, res);
      break;
  }
};

export default refund;
