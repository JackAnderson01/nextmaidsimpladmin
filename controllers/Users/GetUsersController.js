import Joi from "@hapi/joi";
import UserEntity from "../../schema/user/UserSchema";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";
import UserBlockEntity from "../../schema/admin/UserBlockSchema";

const validator = Joi.object({
  page: Joi.number().allow(null),
});

export default async function GetUsersController(req, res) {
  try {
    await ValidateTokenController(req, res, "admin");

    const { error } = await validator.validateAsync(req.body);

    if (error) {
      return res.status(400).send({ Error: error });
    }

    const page = parseInt(req.body.page) || 1; // Page number, default is 1
    const limit = parseInt(req.query.limit) || 5; // Number of items per page, default is 10

    const skip = (page - 1) * limit; // Calculate the number of documents to skip

    const recordsCount = await UserEntity.find(
      {
        isSessionComplete: true,
      },
      { _id: 1 }
    );

    const deletedUsers = await UserBlockEntity.find({ isDeleted: true });
    const deletedUserEmails = [];

    deletedUsers.forEach((user) => {
      deletedUserEmails.push(user.email);
    });

    const users = await UserEntity.find({
      email: { $nin: deletedUserEmails },
      isSessionComplete: true,
    })
      .skip(skip)
      .limit(limit);

    if (users.length === 0) {
      res.status(404).json({
        success: false,
        result: users,
        message: "No results found",
      });
    } else {
      res.status(200).json({
        success: true,
        result: users,
        currentPage: page,
        totalPages: Math.ceil(recordsCount.length / limit),
      });
    }
  } catch (err) {
    res.status(422).json({
      success: false,
      error: err.message,
    });
  }
}
