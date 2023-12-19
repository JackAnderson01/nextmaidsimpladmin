import SignUpEntity from "../../schema/user/UserSignUpSchema";

export default async function GetUsersSignUpController(req, res) {
  //This controller is not exposed on purpose, Never used

  SignUpEntity.find({})
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
