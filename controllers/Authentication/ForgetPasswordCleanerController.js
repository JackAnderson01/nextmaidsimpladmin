import bcrypt from "bcryptjs";
import UserSignUpEntity from "../../schema/user/UserSignUpSchema";
import UserEntity from "../../schema/user/UserSchema";
import Joi from "@hapi/joi";
import { GenerateToken } from "./Token/GenerateToken";
import ReferCodeEntity from "../../schema/feedback_rewards/ReferCodeSchema";
import { generateReferralCode } from "../Voucher/getReferCodeByEmailController";

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  referralCode: Joi.string().min(4).allow(null),
});

export default async function SignUpUserController(req, res) {
  const { name, preferredName, email, phone, password, referralCode } =
    req.body;
  const emailExist = await UserSignUpEntity.findOne({ email: email });

  if (emailExist) {
    res.status(400).send({ Error: "Email Already in use!" });
    return;
  }
  try {
    const { error } = await registerSchema.validateAsync(req.body);

    if (error) {
      res.status(400).send({ Error: error.details[0].message });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password, salt);

      const user = new UserSignUpEntity({
        name: name,
        email: email,
        preferredName: preferredName,
        phone: phone,
        password: hashedPass,
        referralCode: referralCode,
      });

      const newUser = new UserEntity({
        name,
        preferredName,
        email,
        phone: phone,
        image: null,
        country: null,
        city: null,
        postal: null,
        state: null,
        address: null,
        referralCode: referralCode,
      });

      //Taking email of the user who referred the code, by checking the referCodeEntity where code matches
      let referrerEmailRecord = null;
      if (referralCode !== null && referralCode !== "") {
        referrerEmailRecord = await ReferCodeEntity.findOne({
          code: referralCode,
        });
      }

      //Adding userEmail as user who was referred into Referrers Record so as to keep track of users referred
      if (referrerEmailRecord !== null) {
        const newUserReferred = { email: email, didOrder: 0 };

        await ReferCodeEntity.findOneAndUpdate(
          { email: referrerEmailRecord.email },
          {
            $push: { usersReferred: newUserReferred },
          }
        );

        //TODO add this in redeem api
        // const referRecord = await ReferCodeEntity.findOne({
        //   email: referrerEmailRecord.email,
        // });

        // if(referRecord.usersReferred)//TODO Check for number of users referred that have ordered
      }

      const code = generateReferralCode(4);
      const refer = new ReferCodeEntity({
        email: email,
        code: code,
        referredByEmail:
          referrerEmailRecord != null ? referrerEmailRecord.email : null,
        usersReferred: [],
        purchaseCount: 0,
      });

      const savedRefer = await refer.save();
      const saveUser = await user.save();
      const saveNewUser = await newUser.save();

      const payload = { role: "user", email: email, password: password };
      const token = GenerateToken(payload);

      res
        .status(201)
        .json({ result: "User Created Successfully", token: token });
    }
  } catch (err) {
    res.status(500).send({ success: false, error: err });
  }
}
