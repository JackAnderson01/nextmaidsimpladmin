// import Joi from "@hapi/joi";
// import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";
// import StripeCustomerEntity from "../../schema/finance/StripeCustomer";
// import { stripe } from "./stripe";
// import UserEntity from "../../schema/user/UserSchema";

// const emailValidator = Joi.object({
//   email: Joi.string().email().required(),
// });

// export default async function CreateAndGetStripeCustomerController(req, res) {
//   try {
//     ValidateTokenController(req, res, "user");

//     const { email } = req.body;

//     const { error } = await emailValidator.validateAsync(req.body);

//     if (error) {
//       return res
//         .status(400)
//         .send({ success: false, error: error.details[0].message });
//     }

//     const existingStripeCustomer = await StripeCustomerEntity.findOne({
//       email: email,
//     });

//     if (existingStripeCustomer != null) {
//       return res.status(200).send({
//         success: true,
//         result: { customerId: existingStripeCustomer.customerId },
//       });
//     } else {
//       const user = await UserEntity.findOne({ email: email });

//       if (user == null) {
//         return res
//           .status(404)
//           .send({ success: false, error: "No such user found" });
//       } else if (user.name == null) {
//         return res
//           .status(400)
//           .send({ success: false, error: "Update user profile first" });
//       }

//       //Create customer in stripe
//       const customer = await stripe.customers.create({
//         email: email,
//         name: user.name,
//       });

//       //save that customer in database
//       const newStripeCustomer = new StripeCustomerEntity({
//         email: email,
//         customerId: customer.id,
//       });

//       const savedStripeCustomer = await newStripeCustomer.save();

//       return res
//         .status(201)
//         .json({ success: true, result: { customerId: customer.id } });
//     }
//   } catch (err) {
//     res.status(500).json({ success: false, error: err });
//   }
// }
