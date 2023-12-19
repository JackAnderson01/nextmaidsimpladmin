import bcrypt from "bcryptjs";
import UserSignUpEntity from "../../schema/user/UserSignUpSchema";
import UserEntity from "../../schema/user/UserSchema";
import Joi from "@hapi/joi";
import ReferCodeEntity from "../../schema/feedback_rewards/ReferCodeSchema";
import { generateReferralCode } from "../Voucher/getReferCodeByEmailController";
import ServiceProviderSignUpEntity from "../../schema/service_provider/ServiceProviderSignupSchema";
import UserBlockEntity from "../../schema/admin/UserBlockSchema";
import FireUserEntity from "../../schema/firebase/FireUserSchema";
import CreateProfile from "../Firebase/CreateProfile";
import DeleteProfile from "../Firebase/DeleteProfile";
import OTPEntity from "../../schema/auth/OTPSchema";
import ServiceProviderEntity from "../../schema/service_provider/ServiceProviderSchema";

const registerSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  preferredName: Joi.string().min(3).required(),
  phone: Joi.string().min(10),
  password: Joi.string().min(8).required(),
  referralCode: Joi.string().min(4).allow(null),
  // uid: Joi.string().length(28).allow(null),
});

export default async function SignUpUserController(req, res) {
  const { name, preferredName, email, phone, password, referralCode, uid } =
    req.body;

  try {
    const { error } = await registerSchema.validateAsync(req.body);

    if (error) {
      res.status(400).send({ success: false, Error: error.details[0].message });
    } else {
      await userResignUp(res, email);

      const salt = await bcrypt.genSalt(10);
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
        image: null,
        country: null,
        city: null,
        postal: null,
        state: null,
        address: null,
        referralCode: referralCode,
      });

      const newBlockUser = new UserBlockEntity({
        email: email,
        isBlocked: false,
        isDeleted: false,
      });

      // if (uid != null) {
      //   // TODO Remove this commented line if conflicts ends on web dev side
      //   // const fireUser = await CreateUser(email, password);
      //   const newFireUser = new FireUserEntity({
      //     uid: uid,
      //     email: email,
      //     name: name,
      //     role: "user",
      //     didUseEmailSignIn: true,
      //   });

      //   //To create the database of chat
      //   await CreateProfile(
      //     uid,
      //     email,
      //     "https://images.pexels.com/photos/954599/pexels-photo-954599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      //     name,
      //     "users",
      //     false
      //   );

      //   const saveFireUser = await newFireUser.save();
      // }

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
        discountEarned: 0,
      });

      const savedRefer = await refer.save();
      const saveUser = await user.save();
      const saveNewUser = await newUser.save();
      const saveBlockUser = await newBlockUser.save();

      // const payload = { role: "user", email: email, password: password };
      // const token = GenerateToken(payload);

      res
        .status(201)
        .json({ success: true, result: "User Created Successfully" });
    }
  } catch (err) {
    res.status(500).send({ success: false, error: err });
  }
}

export async function userResignUp(res, email) {
  const emailExist = await UserSignUpEntity.findOne({
    email: email,
  });
  const emailExist2 = await ServiceProviderSignUpEntity.findOne({
    email: email,
  });
  const emailExist3 = await FireUserEntity.findOne({ email: email });

  if (emailExist || emailExist2 || emailExist3) {
    // console.log("Here 41");
    if (emailExist2) {
      // console.log("Here 43");

      const cleanerRecord = await ServiceProviderEntity.findOne({
        email: email,
        isSessionComplete: true,
      });
      // console.log("Here 49");

      const cleanerOTPRecord = await OTPEntity.findOne({
        email: email,
        hasValidated: true,
        forPassword: false,
      });
      // console.log("Here 56");

      if (cleanerRecord != null && cleanerOTPRecord != null) {
        // console.log("Here 60");

        return res
          .status(400)
          .send({ success: false, Error: "Email Already in use!" });
      }
      // console.log("Here 66");
    } else if (emailExist) {
      // console.log("Here 69");

      const userRecord = await UserEntity.findOne({
        email: email,
        isSessionComplete: true,
      });
      // console.log("Here 75");

      const userOTPRecord = await OTPEntity.findOne({
        email: email,
        hasValidated: true,
        forPassword: false,
      });
      // console.log("Here 82");
      // console.log(cleanerRecord);
      // console.log(cleanerOTPRecord);

      if (userRecord != null && userOTPRecord != null) {
        // console.log("Here 86");

        return res.status(400).send({
          success: false,
          Error: "Email Already in use!, please login instead",
        });
      }
    }
    // console.log("Here 94");

    await ServiceProviderSignUpEntity.deleteOne({ email: email });
    await ServiceProviderEntity.deleteOne({ email: email });
    await UserSignUpEntity.deleteOne({ email: email });
    await UserEntity.deleteOne({ email: email });
    if (emailExist3) {
      // console.log("Here 101");

      await DeleteProfile(emailExist3.uid, "users");
      await DeleteProfile(emailExist3.uid, "cleaners");
      await FireUserEntity.deleteOne({
        email: email,
        uid: emailExist3.uid,
      });
    } else {
      // console.log("Here 110");

      await FireUserEntity.deleteOne({ email: email });
    }
  }
}
