import Joi from "@hapi/joi";
import RatingEntity from "../../schema/feedback_rewards/RatingsSchema";
import BankDetailsEntity from "../../schema/finance/BankDetailsSchema";
import WalletEntity from "../../schema/finance/WalletSchema";
import ServiceProviderEntity from "../../schema/service_provider/ServiceProviderSchema";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";

const validator = Joi.object({
  email: Joi.string().email().required(),
});

export default async function GetCleanerDetailsWebController(req, res) {
  try {
    const { email } = req.body;

    await ValidateTokenController(req, res, "cleaner", "admin");

    const { error } = await validator.validateAsync(req.body);

    if (error) {
      return res.status(400).send({ Error: error });
    }

    const cleaner = await ServiceProviderEntity.findOne({ email: email });
    const bankDetails = await BankDetailsEntity.find({ email: email });
    const walletDetails = await WalletEntity.findOne({ email: email });
    const ratings = await RatingEntity.find({
      serviceProviderEmail: email,
      isApproved: true,
    });

    return res.status(200).json({
      cleaner: cleaner,
      bankDetails: bankDetails,
      wallet: walletDetails,
      ratings: ratings,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
}
