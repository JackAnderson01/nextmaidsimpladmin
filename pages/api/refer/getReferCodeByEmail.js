import GetReferCodeByEmailController from "../../../controllers/Voucher/getReferCodeByEmailController.js";

import connection from "../../../lib/connection.js";

const getReferCodeByEmail = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await GetReferCodeByEmailController(req, res);
      break;
  }
};

export default getReferCodeByEmail;
