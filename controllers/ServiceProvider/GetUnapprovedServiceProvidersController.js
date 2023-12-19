import ServiceProviderEntity from "../../schema/service_provider/ServiceProviderSchema";
import Joi from "@hapi/joi";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";

const validator = Joi.object({
  page: Joi.number().allow(null),
});

export default async function GetUnapprovedServiceProvidersController(
  req,
  res
) {
  try {
    await ValidateTokenController(req, res, "admin");

    const { error } = await validator.validateAsync(req.body);

    if (error) {
      return res.status(400).send({ Error: error });
    }

    const page = parseInt(req.body.page) || 1; // Page number, default is 1
    const limit = parseInt(req.query.limit) || 5; // Number of items per page, default is 10

    const skip = (page - 1) * limit; // Calculate the number of documents to skip

    const recordsCount = await ServiceProviderEntity.find(
      {
        isSessionComplete: true,
        $or: [{ isApproved: null }, { isApproved: false }],
      },
      { _id: 1 }
    );

    ServiceProviderEntity.find({
      isSessionComplete: true,
      $or: [{ isApproved: null }, { isApproved: false }],
    })
      .skip(skip)
      .limit(limit)
      .then((response) => {
        if (response.length === 0) {
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
