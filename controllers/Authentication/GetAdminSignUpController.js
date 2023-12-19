import AdminSignUpEntity from "../../schema/admin/AdminSignUpSchema";

export default async function GetAdminsSignUpController(req, res) {
  //This controller is not exposed on purpose, Never used
  AdminSignUpEntity.find({})
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
