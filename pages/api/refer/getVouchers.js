import GetVouchersByEmailController from "../../../controllers/Voucher/getVouchersByEmailController.js";

import connection from "../../../lib/connection.js";

const getVouchers = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await GetVouchersByEmailController(req, res);
      break;
  }
};

export default getVouchers;
