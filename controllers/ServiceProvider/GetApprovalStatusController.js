import ServiceProviderEntity from "../../schema/service_provider/ServiceProviderSchema";
import Joi from "@hapi/joi";

const emailValidator = Joi.object({
  email: Joi.string().email().required(),
});

export default async function GetCleanerApprovalController(req, res) {
  const { email } = req.body;

  try {
    const cleaner = await ServiceProviderEntity.findOne({ email: email });

    if (cleaner == null) {
      return res.status(404).json({
        success: false,
        error: "No such profile found",
      });
    }

    return res.status(200).json({
      success: true,
      isApproved: cleaner.isApproved,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
}
