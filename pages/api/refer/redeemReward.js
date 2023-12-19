import redeemVoucherController from "../../../controllers/Voucher/redeemVoucherController.js";

import connection from "../../../lib/connection.js";

const redeemReward = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await redeemVoucherController(req, res);
      break;
  }
};

export default redeemReward;
