import bcrypt from "bcryptjs";
import Joi from "@hapi/joi";
import ServiceProviderSignUpEntity from "../../../schema/service_provider/ServiceProviderSignupSchema";
import ServiceProviderEntity from "../../../schema/service_provider/ServiceProviderSchema";
import WalletEntity from "../../../schema/finance/WalletSchema";
import { GenerateToken } from "../Token/GenerateToken";
import generateRandomPassword from "./generateRandomPassword";
import UserBlockEntity from "../../../schema/admin/UserBlockSchema";
import { cleanerResignUp } from "../../ServiceProvider/SignUpCleanerController";
import FireUserEntity from "../../../schema/firebase/FireUserSchema";
import CreateProfile from "../../Firebase/CreateProfile";
// import { uploadBase64Image } from "../../Firebase/Chat/uploadBase64Image";

const validator = Joi.object({
  name: Joi.string().min(3).required(),
  preferredName: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).required(),
  country: Joi.string().max(50).required().allow(null),
  city: Joi.string().max(50).required(),
  postal: Joi.string().min(2).max(10).required(),
  state: Joi.string().max(50).required(),
  address: Joi.string().max(150).required(),
  uid: Joi.string().min(28).required(),
});

export default async function SignUpCleanerGoogleController(req, res) {
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
  } = req.body;

  try {
    const { error } = await validator.validateAsync(req.body);

    if (error) {
      return res
        .status(400)
        .send({ success: false, Error: error.details[0].message });
    } else {
      // const verified = await OTPEntity.findOne({ email: email });
      // if (verified != null) {
      //   return res.status(400).send({ error: "Profile Already Exists" });
      // }

      // const emailExist = await ServiceProviderSignUpEntity.findOne({
      //   email: email,
      // });

      // const emailExist2 = await UserSignUpEntity.findOne({ email: email });

      // if (emailExist != null || emailExist2 != null) {
      //   return res
      //     .status(400)
      //     .send({ success: false, Error: "Email Already in use!" });
      // }

      await cleanerResignUp(res, email);

      const salt = await bcrypt.genSalt(10);
      const password = generateRandomPassword();
      const hashedPass = await bcrypt.hash(password, salt);

      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString("en-US", {
        format: "MM/DD/YYYY",
      });
      const user = new ServiceProviderSignUpEntity({
        name: name,
        email: email,
        phone: phone,
        preferredName: preferredName,
        password: hashedPass,
        phone: phone,
        documents: null,
        joinedAt: formattedDate,
      });

      const newUser = new ServiceProviderEntity({
        name: name,
        preferredName: preferredName,
        email: email,
        phone: phone,
        image: null,
        country: country ?? "US",
        state: state,
        city: city,
        street: address,
        postal: postal,
        about: null,
        address: null,
        documents: null,
        rating: null,
      });

      const newFireUser = new FireUserEntity({
        name: name,
        email: email,
        uid: uid,
        role: "cleaner",
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

      // var imageURL = null;
      // if (image != null) {
      //   imageURL = await uploadBase64Image(image, email);
      // }

      //To create the database of chat
      await CreateProfile(
        uid,
        email,
        "https://images.pexels.com/photos/954599/pexels-photo-954599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        name,
        "cleaners",
        false
      );

      const saveWallet = await newWallet.save();
      const saveUser = await user.save();
      const saveNewUser = await newUser.save();
      const saveGoogleUser = await newFireUser.save();
      const saveBlockUser = await newBlockUser.save();

      const payload = {
        role: "temp-cleaner",
        email: email,
        uid: uid,
      };
      const token = GenerateToken(payload);

      return res.status(201).json({
        success: true,
        result: "Cleaner Created Successfully",
        token: token,
      });
    }
  } catch (err) {
    return res.status(500).send({ success: false, error: err });
  }
}
