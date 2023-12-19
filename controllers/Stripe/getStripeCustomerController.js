import StripeCustomerEntity from "../../schema/finance/StripeCustomer";
import { stripe } from "./stripe";
import UserEntity from "../../schema/user/UserSchema";

export default async function GetStripeCustomerController(email) {
  try {
    const existingStripeCustomer = await StripeCustomerEntity.findOne({
      email: email,
    });

    if (existingStripeCustomer != null) {
      return existingStripeCustomer.customerId;
    } else {
      const user = await UserEntity.findOne({ email: email });

      if (user == null || user.name == null) {
        return false;
      }

      //Create customer in stripe
      const customer = await stripe.customers.create({
        email: email,
        name: user.name,
      });

      //save that customer in database
      const newStripeCustomer = new StripeCustomerEntity({
        email: email,
        customerId: customer.id,
      });

      const savedStripeCustomer = await newStripeCustomer.save();

      return customer.id;
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
}
