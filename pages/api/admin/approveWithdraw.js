import ApproveWithdrawController from "../../../controllers/Admin/ApproveWithdrawController.js";
import connection from "../../../lib/connection.js";

const approveWithdraw = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await ApproveWithdrawController(req, res);
      break;
  }
};

export default approveWithdraw;
