import BankDetailsEntity from "../../schema/finance/BankDetailsSchema";
import Joi from "@hapi/joi";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";

const bankDetailValidator = Joi.object({
  id: Joi.string().required().allow(null),
  email: Joi.string().email().required(),
  bankName: Joi.string().required(),
  accountTitle: Joi.string().required(),
  routingNumber: Joi.string().required(),
  accountNumber: Joi.string().required(),
  bankCode: Joi.string().required().allow(null),
  branchCode: Joi.string().required().allow(null),
});

export default async function PostBankDetailsController(req, res) {
  try {
    await ValidateTokenController(req, res, "cleaner", "temp-cleaner");

    const {
      id,
      email,
      bankName,
      accountTitle,
      routingNumber,
      accountNumber,
      bankCode,
      branchCode,
    } = req.body;

    const { error } = await bankDetailValidator.validateAsync(req.body);

    if (error) {
      res.status(400).send({ Error: error });
    } else {
      var existingBank =
        id != null ? await BankDetailsEntity.findOne({ _id: id }) : null;
      if (existingBank) {
        const updateResult = await BankDetailsEntity.findOneAndUpdate(
          { _id: id },
          {
            bankName: bankName,
            accountTitle: accountTitle,
            routingNumber: routingNumber,
            accountNumber: accountNumber,
            bankCode: bankCode,
            branchCode: branchCode,
          },
          { new: true }
        );

        if (updateResult) {
          res.status(200).json({ success: true, result: updateResult });
        } else {
          res
            .status(200)
            .json({ success: false, message: "No documents were modified" });
        }

        // res.status(200).json({ success: true, result: updateUser });
      } else {
        const bankDetailsRecord = new BankDetailsEntity({
          email: email,
          bankName: bankName,
          accountTitle: accountTitle,
          routingNumber: routingNumber,
          accountNumber: accountNumber,
          bankCode: bankCode,
          branchCode: branchCode,
        });

        const saveBankDetails = await bankDetailsRecord.save();
        res.status(201).json({ success: true, result: saveBankDetails });
      }
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
}
