import bcrypt from "bcryptjs";
import Joi from "@hapi/joi";
import UserSignUpEntity from "../../../schema/user/UserSignUpSchema";
import UserEntity from "../../../schema/user/UserSchema";
import ReferCodeEntity from "../../../schema/feedback_rewards/ReferCodeSchema";
import { generateReferralCode } from "../../Voucher/getReferCodeByEmailController";
import { GenerateToken } from "../Token/GenerateToken";
import generateRandomPassword from "./generateRandomPassword";
import UserBlockEntity from "../../../schema/admin/UserBlockSchema";
import { userResignUp } from "../SignUpUserController";
import { uploadBase64Image } from "../../Firebase/Chat/uploadBase64Image";
import CreateProfile from "../../Firebase/CreateProfile";
import FireUserEntity from "../../../schema/firebase/FireUserSchema";

const validator = Joi.object({
  name: Joi.string().min(3).required(),
  preferredName: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10),
  country: Joi.string().max(50).required().allow(null),
  city: Joi.string().max(50).required(),
  postal: Joi.string().min(2).max(10).required(),
  state: Joi.string().max(50).required(),
  address: Joi.string().max(150).required(),
  uid: Joi.string().min(28).required(),
  referralCode: Joi.string().min(4).required().allow(null),
  image: Joi.string().min(25).required().allow(null),
});

export default async function SignUpUserGoogleController(req, res) {
  const {
    name,
    preferredName,
    email,
    phone,
    country,
    city,
    postal,
    state,
    address,
    uid,
    referralCode,
    image,
  } = req.body;

  try {
    const { error } = await validator.validateAsync(req.body);

    if (error) {
      res.status(400).send({ success: false, Error: error.details[0].message });
    } else {
      await userResignUp(res, email);

      const salt = await bcrypt.genSalt(10);
      const password = generateRandomPassword();
      const hashedPass = await bcrypt.hash(password, salt);

      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString("en-US", {
        format: "MM/DD/YYYY",
      });
      const user = new UserSignUpEntity({
        name: name,
        email: email,
        preferredName: preferredName,
        phone: phone,
        password: hashedPass,
        referralCode: referralCode,
        joinedAt: formattedDate,
      });

      const newUser = new UserEntity({
        name,
        preferredName,
        email,
        phone: phone,
        image: image,
        country: country,
        city: city,
        postal: postal,
        state: state,
        address: address,
        referralCode: referralCode,
      });

      const newFireUser = new FireUserEntity({
        uid: uid,
        email: email,
        name: name,
        role: "user",
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

      const newBlockUser = new UserBlockEntity({
        email: email,
        isBlocked: false,
        isDeleted: false,
      });

      var imageURL = null;
      if (image != null) {
        imageURL = await uploadBase64Image(image, email);
      }

      //To create the database of chat
      await CreateProfile(
        uid,
        email,
        imageURL ??
          "https://images.pexels.com/photos/954599/pexels-photo-954599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        name,
        "users",
        false
      );

      const savedRefer = await refer.save();
      const saveUser = await user.save();
      const saveNewUser = await newUser.save();
      const saveGoogleUser = await newFireUser.save();
      const saveBlockUser = await newBlockUser.save();

      const payload = {
        role: "user",
        email: email,
        uid: uid,
      };
      const token = GenerateToken(payload);

      return res.status(201).json({
        success: true,
        result: "User Created Successfully",
        token: token,
      });
    }
  } catch (err) {
    res.status(500).send({ success: false, error: err });
  }
}
