import CreateStripeClientSecretController from "../../../controllers/Stripe/CreateStripeClientSecretController.js";
import connection from "../../../lib/connection.js";

const GetStripeClientSecret = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await CreateStripeClientSecretController(req, res);
      break;
  }
};

export default GetStripeClientSecret;
