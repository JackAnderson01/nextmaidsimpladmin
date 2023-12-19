import GetServiceWalletController from "../../../controllers/Finance/GetServiceWalletController.js";
import connection from "../../../lib/connection.js";

const getWallet = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await GetServiceWalletController(req, res);
      break;
  }

  return res.status(405).end();
};

export default getWallet;
