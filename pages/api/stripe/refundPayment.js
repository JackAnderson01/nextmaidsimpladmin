import RefundStripeController from "../../../controllers/Stripe/RefundStripeController.js";
import connection from "../../../lib/connection.js";

const refundPayment = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await RefundStripeController(req, res);
      break;
  }

  return res.status(405).end();
};

export default refundPayment;
