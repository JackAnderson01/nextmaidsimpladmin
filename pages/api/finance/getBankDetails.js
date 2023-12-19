import GetBankDetailsController from "../../../controllers/Finance/GetBankDetailsController.js";
import connection from "../../../lib/connection.js";

const getBankDetails = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await GetBankDetailsController(req, res);
      break;
  }

  return res.status(405).end();
};

export default getBankDetails;
