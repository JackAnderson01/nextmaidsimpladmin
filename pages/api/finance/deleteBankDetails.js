import DeleteBankDetailsController from "../../../controllers/Finance/DeleteBankDetailsController.js";
import connection from "../../../lib/connection.js";

const deleteBankDetails = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await DeleteBankDetailsController(req, res);
      break;
  }

  return res.status(405).end();
};

export default deleteBankDetails;
