import GetRewardStatusController from "../../../controllers/Voucher/getRewardStatusController.js";

import connection from "../../../lib/connection.js";

const getRewardStatus = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await GetRewardStatusController(req, res);
      break;
  }
};

export default getRewardStatus;
