import bcrypt from "bcryptjs";
import SignUpAdminEntity from "../../schema/admin/AdminSignUpSchema";
import Joi from "@hapi/joi";
import { GenerateToken } from "./Token/GenerateToken";

const LoginValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export default async function LoginAdminController(req, res) {
  const { email, password } = req.body;

  try {
    const { error } = await LoginValidator.validateAsync(req.body);

    console.log(req.body);

    if (error) {

      return res.status(400).send({ success: false, error: error });

    } else {

      const admin = await SignUpAdminEntity.findOne({ email: email });
    if (!admin) {

        return res
          .status(400)
          .send({ success: false, error: "incorrect email" });
      }

      const validPassword = await bcrypt.compare(
        req.body.password,
        admin.password
      );


      if (!validPassword)
        return res
          .status(400)
          .send({ success: false, error: "incorrect password" });

      const payload = { role: "admin", email: email, password: password };

      const token = GenerateToken(payload);

      res.status(200).json({ success: true, token: token });
    }
  } catch (err) {
    res
      .status(500)
      .send({ success: false, message: "error occured here", error: err });
  }
}
