import PostWithdrawController from "../../../controllers/Finance/PostWidthdrawController.js";
import connection from "../../../lib/connection.js";

const withdraw = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await PostWithdrawController(req, res);
      break;
  }

  return res.status(405).end();
};

export default withdraw;
