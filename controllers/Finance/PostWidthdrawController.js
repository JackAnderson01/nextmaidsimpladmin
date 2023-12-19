import Joi from "@hapi/joi";
import TransactionEntity from "../../schema/finance/TransactionSchema";
import WalletEntity from "../../schema/finance/WalletSchema";
import WithdrawEntity from "../../schema/finance/WithdrawSchema";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";
import ServiceProviderEntity from "../../schema/service_provider/ServiceProviderSchema";
import sendNotificationsByEmail from "../Notifications/sendNotificationByEmail";

const WithdrawValidator = Joi.object({
  email: Joi.string().email().required(),
  bankId: Joi.string().min(5).required(),
  title: Joi.string().required(),
  subTitle: Joi.string().required(),
  amount: Joi.number().positive().required(),
});

export default async function PostWithdrawController(req, res) {
  try {
    await ValidateTokenController(req, res, "cleaner");

    const { email, title, subTitle, amount, bankId } = req.body;

    try {
      await WithdrawValidator.validateAsync(req.body);
    } catch (validationError) {
      return res.status(400).send({
        success: false,
        error: validationError.details[0].message,
      });
    }

    // const currentDateTime = new Date();

    // // Extract date and time components
    // const year = currentDateTime.getFullYear();
    // const month = String(currentDateTime.getMonth() + 1).padStart(2, "0"); // Month is 0-based
    // const day = String(currentDateTime.getDate()).padStart(2, "0");
    // const hours = String(currentDateTime.getHours()).padStart(2, "0");
    // const minutes = String(currentDateTime.getMinutes()).padStart(2, "0");
    // const seconds = String(currentDateTime.getSeconds()).padStart(2, "0");

    // Create date and time strings
    const date = getFinanceDate();
    const time = getFinanceTime();

    const cleaner = await ServiceProviderEntity.findOne({ email: email });
    const wallet = await WalletEntity.findOne({ email: email });

    //Checks if amount is available and deducts the amount and saves record in withdraw for request to admin to approve
    //, wallet, and transaction for recent transactions and graph

    if (wallet == null || wallet.balance < amount) {
      return res
        .status(400)
        .send({ error: { message: "Insufficient balance!" } });
    } else {
      await WalletEntity.updateOne(
        { email: email },
        { $inc: { balance: -amount } },
        { new: true }
      );

      const transactionRecord = new TransactionEntity({
        email: email,
        title: title,
        subTitle: subTitle,
        date: date,
        time: time,
        amount: amount,
        type: "withdraw",
        isComplete: false,
      });

      const saveRecord = await transactionRecord.save();

      const withdrawRecord = new WithdrawEntity({
        email: email,
        name: cleaner["name"],
        bankId: bankId,
        amount: amount,
        date: date,
        isWithdrawApproved: null,
        isWithdrawCompleted: false, //TODO open
        transactionId: saveRecord._id,
      });
      await withdrawRecord.save();

      sendNotificationsByEmail(
        "MaidSimpl Business",
        `Withdraw request sent for \$${amount} from ${email} on ${date}`,
        email
      );

      // return res.status(201).json({ success: true, result: saveRecord });
      const responseRecord = {
        ...saveRecord.toObject(),
        isComplete: undefined,
      };

      return res.status(201).json({ success: true, result: responseRecord });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
}

export function getFinanceDate() {
  const currentDateTime = new Date();

  // Extract date and time components
  const year = currentDateTime.getFullYear();
  const month = String(currentDateTime.getMonth() + 1).padStart(2, "0"); // Month is 0-based
  const day = String(currentDateTime.getDate()).padStart(2, "0");

  const date = `${year}-${month}-${day}`;

  return date;
}

export function getFinanceTime() {
  const currentDateTime = new Date();

  const hours = String(currentDateTime.getHours()).padStart(2, "0");
  const minutes = String(currentDateTime.getMinutes()).padStart(2, "0");
  const seconds = String(currentDateTime.getSeconds()).padStart(2, "0");

  const time = `${hours}:${minutes}:${seconds}`;
  return time;
}
