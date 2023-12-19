import ServiceProviderSignUpEntity from "../../schema/service_provider/ServiceProviderSignupSchema";
import UserSignUpEntity from "../../schema/user/UserSignUpSchema";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";

export default async function GetSignUpCountsController(req, res) {
  try {
    await ValidateTokenController(req, res, "admin");

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const users = await UserSignUpEntity.aggregate([
      {
        $match: {
          joinedAt: { $gte: sixMonthsAgo },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%m/%Y", date: "$joinedAt" },
          },
          users: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          users: "$users",
        },
      },
      {
        $sort: { date: 1 },
      },
    ]);

    const cleaners = await ServiceProviderSignUpEntity.aggregate([
      {
        $match: {
          joinedAt: { $gte: sixMonthsAgo },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%m/%Y", date: "$joinedAt" },
          },
          cleaners: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          cleaners: "$cleaners",
        },
      },
      {
        $sort: { date: 1 },
      },
    ]);

    return res.status(200).json({
      success: true,
      result: {
        cleaners: cleaners ?? [],
        users: users ?? [],
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    });
  }
}
