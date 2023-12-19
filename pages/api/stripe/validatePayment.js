import PostStripeSucceededController from "../../../controllers/Stripe/PostStripeSucceededController.js";
import connection from "../../../lib/connection.js";

const validatePayment = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await PostStripeSucceededController(req, res);
      break;
  }

  return res.status(405).end();
};

export default validatePayment;
