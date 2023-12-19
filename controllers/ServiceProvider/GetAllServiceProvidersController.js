import Joi from "@hapi/joi";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";
import ServiceProviderEntity from "../../schema/service_provider/ServiceProviderSchema";
import UserBlockEntity from "../../schema/admin/UserBlockSchema";

const validator = Joi.object({
  page: Joi.number().allow(null),
});

export default async function GetALLServiceProvidersController(req, res) {
  try {
    await ValidateTokenController(req, res, "admin");

    const page = parseInt(req.body.page) || 1; // Page number, default is 1
    const limit = parseInt(req.query.limit) || 5; // Number of items per page, default is 10

    const skip = (page - 1) * limit; // Calculate the number of documents to skip

    const recordsCount = await ServiceProviderEntity.find(
      {
        isSessionComplete: true,
      },
      { _id: 1 }
    );

    const deletedCleaners = await UserBlockEntity.find({ isDeleted: true });
    const deletedCleanerEmails = [];

    deletedCleaners.forEach((user) => {
      deletedCleanerEmails.push(user.email);
    });

    ServiceProviderEntity.find({
      email: { $nin: deletedCleanerEmails },
      isSessionComplete: true,
    })
      .skip(skip)
      .limit(limit)
      .then((response) => {
        if (response.length == 0) {
          res.status(404).json({
            success: false,
            result: response,
            message: "No results found",
          });
        } else {
          res.status(200).json({
            success: true,
            result: response,
            currentPage: page,
            totalPages: Math.ceil(recordsCount.length / limit),
          });
        }
      })
      .catch((err) => {
        res.status(422).json({
          error: err,
        });
      });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
}
