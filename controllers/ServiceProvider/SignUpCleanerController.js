import bcrypt from "bcryptjs";
import Joi from "@hapi/joi";
import ServiceProviderSignUpEntity from "../../schema/service_provider/ServiceProviderSignupSchema";
import ServiceProviderEntity from "../../schema/service_provider/ServiceProviderSchema";
import WalletEntity from "../../schema/finance/WalletSchema";
import OTPEntity from "../../schema/auth/OTPSchema";
import UserSignUpEntity from "../../schema/user/UserSignUpSchema";
import UserBlockEntity from "../../schema/admin/UserBlockSchema";
import FireUserEntity from "../../schema/firebase/FireUserSchema";
import CreateProfile from "../Firebase/CreateProfile";
import DeleteProfile from "../Firebase/DeleteProfile";
import UserEntity from "../../schema/user/UserSchema";

const registerSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  preferredName: Joi.string().min(3).required(),
  password: Joi.string().min(8).required(),
  documents: Joi.array().min(1).allow(null),
  phone: Joi.string().min(10),
  // uid: Joi.string().length(28).allow(null),
});

export default async function SignUpCleanerController(req, res) {
  const { name, preferredName, email, password, documents, phone, uid } =
    req.body;

  try {
    const { error } = await registerSchema.validateAsync(req.body);

    if (error) {
      res.status(400).send({ success: false, Error: error.details[0].message });
    } else {
      await cleanerResignUp(res, email);

      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password, salt);

      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString("en-US", {
        format: "MM/DD/YYYY",
      });
      // console.log("Here 121");

      const user = new ServiceProviderSignUpEntity({
        name: name,
        email: email,
        phone: phone,
        preferredName: preferredName,
        password: hashedPass,
        phone: phone,
        documents: documents,
        joinedAt: formattedDate,
      });

      const newUser = new ServiceProviderEntity({
        name: name,
        preferredName: preferredName,
        email: email,
        phone: phone,
        image: null,
        country: "US",
        state: null,
        city: null,
        street: null,
        postal: null,
        about: null,
        documents: documents,
        rating: null,
      });

      const newWallet = new WalletEntity({
        email: email,
        balance: 0,
      });

      const newBlockUser = new UserBlockEntity({
        email: email,
        isBlocked: false,
        isDeleted: false,
      });

      //TODO remove the fire use code and shift it to create service provider controller
      // if (uid != null) {
      //   const newFireUser = new FireUserEntity({
      //     uid: uid,
      //     email: email,
      //     name: name,
      //     role: "cleaner",
      //     didUseEmailSignIn: true,
      //   });

      //   //To create the database of chat
      //   await CreateProfile(
      //     uid,
      //     email,
      //     "https://images.pexels.com/photos/954599/pexels-photo-954599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      //     name,
      //     "cleaners",
      //     false
      //   );

      //   const saveFireUser = await newFireUser.save();
      // }

      const saveWallet = await newWallet.save();
      const saveUser = await user.save();
      const saveNewUser = await newUser.save();
      const saveBlockUser = await newBlockUser.save();

      res
        .status(201)
        .json({ success: true, result: "Cleaner Created Successfully" });
    }
  } catch (err) {
    res.status(500).send({ success: false, error: err });
  }
}

export async function cleanerResignUp(res, email) {
  const emailExist = await ServiceProviderSignUpEntity.findOne({
    email: email,
  });
  const emailExist2 = await UserSignUpEntity.findOne({ email: email });
  const emailExist3 = await FireUserEntity.findOne({ email: email });

  if (emailExist || emailExist2 || emailExist3) {
    // console.log("Here 41");
    if (emailExist2) {
      // console.log("Here 43");

      const userRecord = await UserEntity.findOne({
        email: email,
        isSessionComplete: true,
      });
      // console.log("Here 49");

      const userOTPRecord = await OTPEntity.findOne({
        email: email,
        hasValidated: true,
        forPassword: false,
      });
      // console.log("Here 56");

      if (userRecord != null && userOTPRecord != null) {
        // console.log("Here 60");

        return res
          .status(400)
          .send({ success: false, Error: "Email Already in use!" });
      }
      // console.log("Here 66");
    } else if (emailExist) {
      // console.log("Here 69");

      const cleanerRecord = await ServiceProviderEntity.findOne({
        email: email,
        isSessionComplete: true,
      });
      // console.log("Here 75");

      const cleanerOTPRecord = await OTPEntity.findOne({
        email: email,
        hasValidated: true,
        forPassword: false,
      });
      // console.log("Here 82");
      // console.log(cleanerRecord);
      // console.log(cleanerOTPRecord);

      if (cleanerRecord != null && cleanerOTPRecord != null) {
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
