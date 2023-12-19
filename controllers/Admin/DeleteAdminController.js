import AdminEntity from "../../schema/admin/AdminSchema";
import AdminSignUpEntity from "../../schema/admin/AdminSignUpSchema";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";

export default async function DeleteAdminController(req, res) {
  try {
    await ValidateTokenController(req, res, "admin");

    const { id } = req.body;
    const deletionResult = await AdminEntity.deleteOne({
      _id: id,
    });
    const deletionResult2 = await AdminSignUpEntity.deleteOne({
      _id: id,
    });

    if (
      deletionResult.deletedCount === 0 &&
      deletionResult2.deletedCount === 0
    ) {
      res.status(404).json({
        success: false,
        message: "id not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Admin deleted successfully",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
}
