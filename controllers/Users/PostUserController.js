import Joi from "@hapi/joi";
import UserEntity from "../../schema/user/UserSchema";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";
import OTPEntity from "../../schema/auth/OTPSchema";
import FireUserEntity from "../../schema/firebase/FireUserSchema";
import { uploadBase64Image } from "../Firebase/Chat/uploadBase64Image";
import CreateProfile from "../Firebase/CreateProfile";
import UpdateProfile from "../Firebase/UpdateProfile";
import blackListToken from "../Authentication/Token/BlackListToken";

const userValidator = Joi.object({
  name: Joi.string().min(3).max(100).required().allow(null),
  preferredName: Joi.string().min(3).max(100).required().allow(null),
  email: Joi.string().email().required(),
  phone: Joi.string().max(20).allow(null),
  image: Joi.string().min(8).allow(null),
  country: Joi.string().max(50).allow(null),
  city: Joi.string().max(50).allow(null),
  postal: Joi.string().min(2).max(10).allow(null),
  state: Joi.string().max(50).allow(null),
  address: Joi.string().max(150).allow(null),
  referralCode: Joi.string().max(4).allow(null),
  uid: Joi.string().length(28).allow(null).required(),
  isEmailSignUp: Joi.boolean().allow(null).required(),
});

export default async function PostUserController(req, res) {
  try {
    await ValidateTokenController(req, res, "user");

    const {
      name,
      preferredName,
      email,
      phone,
      image,
      country,
      city,
      postal,
      state,
      address,
      referralCode,
      uid,
      isEmailSignUp,
    } = req.body;

    try {
      await userValidator.validateAsync(req.body);
    } catch (err) {
      return res.status(400).send({ success: false, Error: err });
    }

    const otpValidator = await checkOTPValidation(email);
    if (!otpValidator) {
      return res
        .status(400)
        .send({ success: false, error: "Profile not verified" });
    }

    const emailExist = await UserEntity.findOne({ email: email });
    if (emailExist) {
      const updateUser = await UserEntity.updateOne(
        { email: email },
        {
          name: name ?? emailExist.name,
          preferredName: preferredName ?? emailExist.preferredName,
          phone: phone ?? emailExist.phone,
          image: image ?? emailExist.image,
          state: state ?? emailExist.state,
          country: country ?? emailExist.country,
          city: city ?? emailExist.city,
          postal: postal ?? emailExist.postal,
          address: address ?? emailExist.address,
          referralCode: referralCode ?? emailExist.referralCode,
        }
      );
      await checkIfUserSessionComplete(email);

      var fireUser = await FireUserEntity.findOne({ email: email });
      if (fireUser == null && uid != null) {
        const newFireUser = new FireUserEntity({
          uid: uid,
          email: email,
          name: name ?? emailExist.name,
          role: "user",
          didUseEmailSignIn: isEmailSignUp ?? true,
        });
        fireUser = await newFireUser.save();

        //To create the database of chat
        await CreateProfile(
          uid,
          email,
          imageURL ??
            "https://images.pexels.com/photos/954599/pexels-photo-954599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          name ?? emailExist.name,
          "users",
          false
        );
      }
      const uidRecord =
        uid == null ? (fireUser == null ? null : fireUser.uid) : uid;

      if (uidRecord != null) {
        await FireUserEntity.updateOne(
          { email: email },
          {
            name: name ?? emailExist.name,
          }
        );

        var imageURL = null;
        if (image != null) {
          imageURL = await uploadBase64Image(image, email);
        }

        //To create the database of chat
        await UpdateProfile(
          uidRecord,
          imageURL ??
            "https://images.pexels.com/photos/954599/pexels-photo-954599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          name ?? emailExist.name,
          "users",
          false
        );
      }

      res.status(200).json({ success: true, result: updateUser });
    } else {
      if (uid == null) {
        return res.status(400).send({
          success: false,
          error: "UID is required for profile creation",
        });
      }

      const userDetails = new UserEntity({
        name: name,
        preferredName: preferredName,
        email: email,
        phone: phone,
        image: image,
        state: state,
        country: country,
        city: city,
        postal: postal,
        address: address,
        referralCode: referralCode,
      });

      const saveUser = await userDetails.save();
      await checkIfUserSessionComplete(email);

      const fireUser = await FireUserEntity.findOne({ email: email });
      const uidRecord =
        uid == null ? (fireUser == null ? null : fireUser.uid) : uid;

      if (uidRecord != null) {
        const newFireUser = new FireUserEntity({
          uid: uidRecord,
          email: email,
          name: name,
          role: "user",
          didUseEmailSignIn: isEmailSignUp ?? true,
        });

        var imageURL = null;
        if (image != null) {
          imageURL = await uploadBase64Image(image, email);
        }

        //To create the database of chat
        await CreateProfile(
          uidRecord,
          email,
          imageURL ??
            "https://images.pexels.com/photos/954599/pexels-photo-954599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          name,
          "users",
          false
        );

        const saveFireUser = await newFireUser.save();
      }

      const responseUser = {
        ...saveUser.toObject(),
        isSessionComplete: undefined,
      };

      res.status(200).json({ success: true, result: responseUser });
    }
  } catch (err) {
    res.status(200).json({ success: false, error: err });
  }
}

export async function checkIfUserSessionComplete(email) {
  const user = await UserEntity.findOne({ email: email });
  const otpValidator = await checkOTPValidation(email);

  if (
    otpValidator &&
    user != null &&
    user.name != null &&
    user.preferredName !== null &&
    user.email != null &&
    user.phone != null &&
    user.image != null &&
    user.country != null &&
    user.city != null &&
    user.postal != null &&
    user.state != null &&
    user.address != null
  ) {
    // if (user.isSessionComplete == false) {
    //   await blackListToken(req, res);
    // }

    const result = await UserEntity.findOneAndUpdate(
      { email: email },
      { isSessionComplete: true }
    );
  }
}

export async function checkOTPValidation(email) {
  const isValidated = await OTPEntity.findOne({
    email: email,
    hasValidated: true,
    forPassword: false,
  });
  const fireUser = await FireUserEntity.findOne({
    email: email,
    didUseEmailSignIn: true,
  });

  return fireUser != null ? isValidated != null : true;
}
