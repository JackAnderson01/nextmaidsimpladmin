import { ValidateTokenController } from "../../../controllers/Authentication/Token/ValidateTokenController.js";
import connection from "../../../lib/connection.js";

const ValidateToken = async (req, res) => {
  await connection();

  const { role } = req.body;

  const method = req.method;
  switch (method) {
    case "POST":
      await ValidateTokenController(req, res, role);
      return res.status(200).send({ success: true });
  }
};

export default ValidateToken;
