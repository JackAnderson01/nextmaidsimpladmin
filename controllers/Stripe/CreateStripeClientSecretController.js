import BookingEntity from "../../schema/booking/BookingSchema";
import PaymentHistoryEntity from "../../schema/finance/PaymentHistorySchema";
import VoucherEntity from "../../schema/feedback_rewards/VoucherSchema";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";
import { stripe } from "./stripe";

import Joi from "@hapi/joi";
import GetStripeCustomerController from "./getStripeCustomerController";

const idValidator = Joi.object({
  bookingId: Joi.string().min(5).required(),
});

export default async function CreateStripeClientSecretController(req, res) {
  const { bookingId } = req.body;

  try {
    await ValidateTokenController(req, res, "user");

    const { error } = await idValidator.validateAsync(req.body);

    if (error) {
      return res.status(400).send({ success: false, error: error });
    }

    //TODO payment already exist will be checked by stripe
    let existingPayment = await PaymentHistoryEntity.findOne({
      _id: bookingId,
    });

    // if (existingPayment) {
    //   return res
    //     .status(400)
    //     .send({ success: false, error: { message: "Payment already exists" } });
    // }

    if (existingPayment != null) {
      const paymentIntent = await stripe.paymentIntents.retrieve(
        existingPayment.paymentIntentId
      );

      if (paymentIntent.status === "succeeded") {
        return res
          .status(200)
          .send({ success: true, result: "Payment already made!" });
      }
    }

    let booking = await BookingEntity.findById({ _id: bookingId });

    if (
      booking == null ||
      booking.servicetype == null ||
      booking.rooms == null ||
      booking.extras == null ||
      booking.date == null ||
      booking.time == null ||
      booking.howoften == null ||
      booking.name == null ||
      booking.preferredName == null ||
      booking.userEmail == null ||
      booking.contact == null ||
      booking.country == null ||
      booking.state == null ||
      booking.city == null ||
      booking.zipcode == null ||
      booking.serviceProvidersArray == null ||
      booking.price == null ||
      booking.location == null ||
      booking.latitude == null ||
      booking.longitude == null
    ) {
      return res.status(400).send({
        success: false,
        error: {
          message:
            "Booking details are incomplete, please update booking details.",
        },
      });
    } else {
      const updatedBooking = await BookingEntity.findOneAndUpdate(
        { _id: bookingId },
        {
          areDetailsComplete: true,
        },
        { new: true }
      );

      if (updatedBooking == null) {
        return res.status(500).send({
          success: false,
          error: {
            message:
              "Booking could not proceed towards payment. Please try again.",
          },
        });
      }
    }

    // if (booking.voucher != null) {
    //   await ReferCodeEntity.findOneAndUpdate(
    //     //TODO also create and cancel voucher of user,
    //     {
    //       "usersReferred.email": booking.userEmail,
    //       //TODO this is wrong, Refer should be cancelled of the user
    //     },
    //     {
    //       $set: { "usersReferred.$.didOrder": 2 },
    //     }
    //   );
    // }

    if (booking == null) {
      return res
        .status(404)
        .send({ success: false, error: "No such booking found" });
    }
    //Checking if booking is complete in details and fields
    else if (
      !(
        booking.servicetype !== null &&
        booking.rooms !== null &&
        booking.extras !== null &&
        booking.date !== null &&
        booking.time !== null &&
        booking.howoften !== null &&
        booking.name !== null &&
        booking.preferredName !== null &&
        booking.userEmail !== null &&
        booking.contact !== null &&
        booking.country !== null &&
        booking.state !== null &&
        booking.city !== null &&
        booking.zipcode !== null &&
        booking.serviceProvidersArray !== null &&
        booking.price !== null &&
        booking.location !== null &&
        booking.latitude !== null &&
        booking.longitude !== null
      )
    ) {
      return res
        .status(400)
        .send({ success: false, error: "booking details missing" });
    }

    const customerId = await GetStripeCustomerController(booking.userEmail);

    if (customerId == false) {
      return res
        .status(400)
        .send({ success: false, error: "Update user profile first" });
    }

    if (booking.voucher != null) {
      await VoucherEntity.findOneAndDelete({ _id: booking.voucher._id });
    }

    //TODO remove this code if nothing breaks
    // let existingTransaction = await PaymentHistoryEntity.findOne({
    //   userEmail: user.email,
    // });

    // if (!existingTransaction) {
    //   customer = await stripe.customers.create({
    //     email: user.email,
    //     name: user.name,
    //   });
    // } else {
    //   customer = await stripe.customers.retrieve(
    //     existingTransaction.customerId
    //   );
    // }

    //Creating product everytime as its service based
    const product = await stripe.products.create({
      name: booking.howoften + " " + booking.servicetype,
      metadata: {
        bookingId: bookingId,
        servicetype: booking.servicetype,
        rooms: JSON.stringify(booking.rooms), //left on comment on purpose
        extras: JSON.stringify(booking.extras), //left comment on, on purpose
        date: booking.date,
        time: booking.time,
        howoften: booking.howoften,
        name: booking.name,
        preferredName: booking.preferredName,
        userEmail: booking.userEmail,
        serviceProviderEmail: booking.serviceProviderEmail ?? "",
        contact: booking.contact,
        city: booking.city,
        state: booking.state,
        country: booking.country,
        zipcode: booking.zipcode,
        comments: booking.comments ?? "",
        progress: booking.progress ?? "",
        status: booking.status ?? "",
        price: booking.price,
        location: booking.location,
        latitude: booking.latitude,
        longitude: booking.longitude,
        timeRequired: booking.timeRequired ?? "",
      },
    });

    if (booking.howoften === "onetime") {
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: booking.price * 100,
        currency: "usd",
      });

      const paymentIntent = await stripe.paymentIntents.create({
        amount: price.unit_amount,
        customer: customerId,
        currency: "usd",
        automatic_payment_methods: { enabled: true },
        metadata: {
          priceId: price.id,
        },
      });

      //TODO change success and cancel URL
      // const session = await stripe.checkout.sessions.create({
      //   mode: "payment",
      //   customer: customer.id,
      //   invoice_creation: { enabled: true },
      //   line_items: [
      //     {
      //       price: price.id,
      //       quantity: 1,
      //     },
      //   ],
      //   success_url: `https://example.com/success`,
      //   cancel_url: "https://example.com/cancel",
      // });

      const transactionRecord = new PaymentHistoryEntity({
        bookingId: bookingId,
        userEmail: booking.userEmail,
        customerId: customerId,
        priceId: price.id,
        paymentIntentId: paymentIntent.id,
        clientSecret: paymentIntent.client_secret,
        subscriptionId: null,
      });

      await transactionRecord.save();

      //This code gives temporary access to payment Methods for checkout reasons
      // const ephemeralKey = await stripe.ephemeralKeys.create(
      //   { customer: customer.id },
      //   { apiVersion: "2023-08-16" }
      // );

      // return res.status(201).json({ success: true, result: session });
      return res.status(201).json({
        success: true,
        subscriptionId: null,
        clientSecret: paymentIntent.client_secret,
        customerId: customerId,
        paymentIntentId: paymentIntent.id,
        // ephemeralKey: ephemeralKey,
      });
    } else {
      let price = "";

      if (booking.howoften === "weekly") {
        price = await stripe.prices.create({
          product: product.id,
          unit_amount: booking.price * 100,
          currency: "usd",
          recurring: {
            interval: "week",
            interval_count: 1,
            usage_type: "licensed",
          },
        });
      } else if (booking.howoften === "biweekly") {
        price = await stripe.prices.create({
          product: product.id,
          unit_amount: booking.price * 100,
          currency: "usd",
          recurring: {
            interval: "week",
            interval_count: 2,
            usage_type: "licensed",
          },
        });
      } else if (booking.howoften === "monthly") {
        price = await stripe.prices.create({
          product: product.id,
          unit_amount: booking.price * 100,
          currency: "usd",
          recurring: {
            interval: "month",
            interval_count: 1,
            usage_type: "licensed",
          },
        });
      }

      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [
          {
            price: price.id,
          },
        ],
        // consent_collection: {
        //   terms_of_service: "required",
        // },
        // cancel_at_period_end: true,
        payment_behavior: "default_incomplete",
        payment_settings: { save_default_payment_method: "on_subscription" },
        expand: ["latest_invoice.payment_intent"],
      });

      const transaction = new PaymentHistoryEntity({
        bookingId: bookingId,
        userEmail: booking.userEmail,
        subscriptionId: subscription.id,
        clientSecret: subscription.latest_invoice.payment_intent.client_secret,
        customerId: customerId,
        priceId: price.id,
        paymentIntentId: subscription.latest_invoice.payment_intent.id,
      });

      await transaction.save();

      //Todo remove this code, if nothing breaks, this code block gives temporary access to credit cards
      // const ephemeralKey = await stripe.ephemeralKeys.create(
      //   { customer: customer.id },
      //   { apiVersion: "2023-08-16" }
      // );

      return res.status(201).json({
        success: true,
        subscriptionId: subscription.id,
        clientSecret: subscription.latest_invoice.payment_intent.client_secret,
        customerId: customerId,
        paymentIntentId: subscription.latest_invoice.payment_intent.id,
        // ephemeralKey: ephemeralKey,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: err,
    });
  }

  //TODO This is checkout stripe link work, kept in case this has to be used instead bcz of cry baby web devs
  //   const setupIntent = await stripe.setupIntents.create({
  //     automatic_payment_methods: { enabled: true },
  //     customer: customer.id,
  //   });

  //   console.log(setupIntent);

  //   const reader = await stripe.terminal.readers.processSetupIntent(
  //     "tmr_0xPaaho8MM4skFa3QGG7lNL7",

  //     {
  //       setup_intent: setupIntent.id,
  //       customer_consent_collected: true,
  //     }
  //   );

  //   const charge = await stripe.charges.create({
  //     amount: 2000,
  //     currency: "usd",
  //     source: "tok_mastercard",
  //     description:
  //       "My First Test Charge (created for API docs at https://www.stripe.com/docs/api)",
  //   });

  //   return res.status(201).json({ success: true, result: charge });

  // const elements = stripe.elements({
  //   mode: 'payment',
  //   amount: 1099,
  //   currency: 'usd',
  //   appearance,
  // });
  // const expressCheckoutElement = elements.create('expressCheckout', options)
  // expressCheckoutElement.mount('#express-checkout-element')
}
