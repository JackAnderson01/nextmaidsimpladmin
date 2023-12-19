import bcrypt from "bcryptjs";
import Joi from "@hapi/joi";
import AdminEntitySignUp from "../../schema/admin/AdminSignUpSchema";
import AdminEntity from "../../schema/admin/AdminSchema";

const registerSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  image: Joi.string().min(20).required(),
});

export default async function SignUpAdminController(req, res) {
  const { name, email, password, image } = req.body;
  const emailExist = await AdminEntitySignUp.findOne({ email: email });

  if (emailExist) {
    return res
      .status(400)
      .send({ success: false, Error: "Email Already Exist!" });
  }
  try {
    const { error } = await registerSchema.validateAsync(req.body);
    if (error) {
      res.status(400).send({ success: false, Error: error.details[0].message });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password, salt);

      const admin = new AdminEntitySignUp({
        name: name,
        email: email,
        password: hashedPass,
        image: image,
      });

      const newAdmin = new AdminEntity({
        firstName: name,
        lastName: "",
        email: email,
        image: image,
      });

      const saveUser = await admin.save();
      const saveNewUser = await newAdmin.save();

      return res
        .status(201)
        .json({ success: true, result: "Admin Created Successfully" });
    }
  } catch (err) {
    res.status(500).send({ success: false, error: err });
  }
}
