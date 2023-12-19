import Joi from "@hapi/joi";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";
import BookingEntity from "../../schema/booking/BookingSchema";
import WalletEntity from "../../schema/finance/WalletSchema";
import VoucherEntity from "../../schema/feedback_rewards/VoucherSchema";
import ReferCodeEntity from "../../schema/feedback_rewards/ReferCodeSchema";
import UserSignUpEntity from "../../schema/user/UserSignUpSchema";
import { generateReferralCode } from "../Voucher/getReferCodeByEmailController";
import AddUID from "../Firebase/AddUID";
import FireUserEntity from "../../schema/firebase/FireUserSchema";
import DeleteUID from "../Firebase/DeleteUID";
import TransactionEntity from "../../schema/finance/TransactionSchema";
import {
  getFinanceDate,
  getFinanceTime,
} from "../Finance/PostWidthdrawController";
import sendNotificationsByEmail from "../Notifications/sendNotificationByEmail";

const validator = Joi.object({
  id: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  progress: Joi.string().valid("completed", "confirmed").allow(null).required(),
  status: Joi.string()
    .valid(
      "booking-confirmed",
      "on-the-way",
      "service-started",
      "halfway-done",
      "almost-done",
      "completed"
    )
    .required(),
});

export default async function UpdateBookingCleanerController(req, res) {
  try {
    await ValidateTokenController(req, res, "cleaner");

    const { id, email, progress, status } = req.body;

    const { error } = await validator.validateAsync(req.body);

    if (error) {
      return res
        .status(400)
        .send({ success: false, error: error.details[0].message });
    }

    const existingBooking = await BookingEntity.findOne(
      {
        _id: id,
        serviceProviderEmail: email,
        areDetailsComplete: true,
        isPaymentDone: true,
      },
      { areDetailsComplete: 0, isPaymentDone: 0 }
    );

    if (existingBooking != null) {
      const timeRequiredNumber = parseFloat(existingBooking.timeRequired);
      const existingBookingTime = new Date(
        `2000-01-01T${existingBooking.time}`
      );

      if (!isNaN(timeRequiredNumber)) {
        existingBookingTime.setHours(
          existingBookingTime.getHours() + timeRequiredNumber
        );
      }
      const existingBookingDate = new Date(existingBooking.date);

      const currentDate = new Date();

      if (
        //TODO open
        existingBookingDate > currentDate ||
        existingBookingTime > currentDate
      ) {
        return res.status(400).send({
          success: false,
          error: "Cannot update a booking that is in future",
        });
      }

      if (existingBooking.progress === "completed") {
        return res.status(200).send({
          success: false,
          error: "Cannot update a booking that is completed",
        });
      }

      const updatedBooking = await BookingEntity.findOneAndUpdate(
        {
          _id: id,
          serviceProviderEmail: email,
          areDetailsComplete: true,
          isPaymentDone: true,
        },
        {
          progress:
            progress === "completed" || status == "completed"
              ? "completed"
              : "confirmed",
          status: status,
        },
        { areDetailsComplete: 0, isPaymentDone: 0 } //TODO Check if this works
      );

      sendNotificationsByEmail(
        "MaidSimpl",
        `Your Booking status is updated to ${status} and progress is ${progress}.`,
        existingBooking.userEmail
      );

      const fireCleaner = await FireUserEntity.findOne({ email: email });
      const fireUser = await FireUserEntity.findOne({
        email: existingBooking.userEmail,
      });

      if (progress == "confirmed") {
        await AddUID(fireCleaner.uid, fireUser.uid);
      }

      //To maintain the wallet of service provider
      if (progress === "completed" || status === "completed") {
        if (email != null) {
          const walletRecord = await WalletEntity.findOne({
            email: email,
          });

          await WalletEntity.findOneAndUpdate(
            { email: email },
            { balance: walletRecord.balance + existingBooking.price }
          );

          const finDate = getFinanceDate();
          const finTime = getFinanceTime();
          const transactionRecord = new TransactionEntity({
            email: existingBooking.serviceProviderEmail,
            title: "Earnings",
            subTitle: "Bank Transfer",
            date: finDate,
            time: finTime,
            amount: existingBooking.price,
            type: "deposit",
            isComplete: true,
          });

          const saveRecord = await transactionRecord.save();
        }

        await DeleteUID(fireCleaner.uid, fireUser.uid, "cleaners");

        await trackReferrers(existingBooking.userEmail);
      }

      return res.status(200).send({ success: true, result: updatedBooking });
    } else {
      return res.status(404).json({
        success: false,
        result: null,
        message: "No such booking found",
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
}

async function trackReferrers(userEmail) {
  const userSignUpRecord = await UserSignUpEntity.find({
    email: userEmail,
  });

  if (userSignUpRecord == null) {
    return false;
  }

  //Taking email of the user who referred the code, by checking the referCodeEntity where code matches
  const referrerEmailRecord = await ReferCodeEntity.findOne({
    code: userSignUpRecord.referralCode,
  });

  //Adding userEmail as user who was referred into Referrers Record so as to keep track of users referred
  if (referrerEmailRecord != null) {
    const updateUserReferred = { email: userEmail, didOrder: 1 }; //TODO remove form signup and only add in booking

    await ReferCodeEntity.findOneAndUpdate(
      {
        email: referrerEmailRecord.email,
        "usersReferred.email": updateUserReferred.email,
      },
      {
        $inc: { purchaseCount: 1, discountEarned: 20 },
        $set: { "usersReferred.$.didOrder": 1 },
      }
    );

    await ReferCodeEntity.findOneAndUpdate(
      {
        email: userEmail,
      },
      {
        $inc: { purchaseCount: 1, discountEarned: 20 },
      }
    );

    //TODO add voucher to both user and referrer after complete
    const today = new Date();

    const date =
      today.getDate() +
      "-" +
      today.getMonth() +
      "-" +
      (today.getFullYear() + 1);

    const voucherRecord = new VoucherEntity({
      email: userEmail,
      discountTitle: "Refer Reward! Enjoy 20$ off",
      discountCode: `${generateReferralCode(4)}`,
      expiryDate: date,
      discountPercent: 0,
      discountPrice: 20,
    });

    const voucherRecord2 = new VoucherEntity({
      email: referrerEmailRecord.email,
      discountTitle: "Refer Reward! Enjoy 20$ off",
      discountCode: `${generateReferralCode(4)}`,
      expiryDate: date,
      discountPercent: 0,
      discountPrice: 20,
    });

    // const finDate = getFinanceDate();
    // const finTime = getFinanceTime();
    // const transactionRecord = new TransactionEntity({
    //   email: userEmail,
    //   title: "Earnings",
    //   subTitle: "Bank Transfer",
    //   date: finDate,
    //   time: finTime,
    //   amount: amount,
    //   type: "withdraw",
    // });

    // const saveRecord = await transactionRecord.save();

    await voucherRecord.save();
    await voucherRecord2.save();
  } else {
    await ReferCodeEntity.findOneAndUpdate(
      {
        email: userEmail,
      },
      {
        $inc: { purchaseCount: 1 },
      }
    );
  }

  return true;
}
