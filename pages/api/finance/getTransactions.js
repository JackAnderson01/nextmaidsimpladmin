import GetTransactionsController from "../../../controllers/Finance/GetTransactionsController.js";
import connection from "../../../lib/connection.js";

const getTransactions = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await GetTransactionsController(req, res);
      break;
  }

  return res.status(405).end();
};

export default getTransactions;
