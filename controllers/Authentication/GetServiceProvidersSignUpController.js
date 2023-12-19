import ServiceProviderSignUpEntity from "../../schema/service_provider/ServiceProviderSignupSchema";

export default async function GetServiceProvidersSignUpController(req, res) {
  await ValidateTokenController(req, res, "admin");

  await ServiceProviderSignUpEntity.find({})
    .then((response) => {
      res.status(200).json({
        success: true,
        result: response,
      });
    })
    .catch((err) => {
      res.status(422).json({
        error: err,
      });
    });
}
