// import StripeCustomerEntity from "../../schema/finance/StripeCustomer";
// import UserEntity from "../../schema/user/UserSchema";
// import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";
// import { stripe } from "./stripe";
// import Joi from "@hapi/joi";

//TODO remove this entire code file
// const idValidator = Joi.object({
//   userEmail: Joi.string().email().required(),
//   paymentMethodId: Joi.string().min(5).required(),
// });

// export default async function CreateStripeCardController(req, res) {
//   const { paymentMethodId, userEmail } = req.body;

//   try {
//     ValidateTokenController(req, res, "user");

//     const { error } = await idValidator.validateAsync(req.body);

//     if (error) {
//       return res.status(400).send({ success: false, error: error });
//     }

//     const existingUser = await UserEntity.findOne({ email: userEmail });

//     if (existingUser == null) {
//       return res
//         .status(404)
//         .send({ success: false, error: { message: "No such user found" } });
//     }

//     const existingStripeCustomer = await StripeCustomerEntity.findOne({
//       email: userEmail,
//     });

//     var customer = undefined;
//     if (existingStripeCustomer != null) {
//       customer = existingStripeCustomer.customerId;
//     } else {
//       //Create customer in stripe
//       customer = await stripe.customers.create({
//         email: existingUser.email,
//         name: existingUser.name,
//       });

//       //save that customer in database
//       const newStripeCustomer = new StripeCustomerEntity({
//         email: userEmail,
//         customerId: customer.id,
//       });

//       await newStripeCustomer.save();
//     }

//     const customerId = customer.id;

//     //attach payment method to customer
//     try {
//       const method = await attachMethod({ paymentMethodId, customerId });
//       res
//         .status(200)
//         .json({ success: true, message: "Payment method attached succesully" });
//     } catch (err) {
//       console.log(err);
//       res
//         .status(400)
//         .json({ success: false, message: "Could not attach method" });
//     }
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       error: err,
//     });
//   }
// }

// function attachMethod({ paymentMethodId, customerId }) {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const paymentMethodAttach = await stripe.paymentMethods.attach(
//         paymentMethodId,
//         {
//           customer: customerId,
//         }
//       );
//       resolve(paymentMethodAttach);
//     } catch (err) {
//       reject(err);
//     }
//   });
// }
