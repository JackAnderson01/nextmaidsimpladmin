import jwt from "jsonwebtoken";
import UserEntity from "../../../schema/user/UserSchema";
import ServiceProviderEntity from "../../../schema/service_provider/ServiceProviderSchema";
import AdminEntity from "../../../schema/admin/AdminSchema";
import BlackListTokenEntity from "../../../schema/auth/BlackListTokenSchema";
import UserBlockEntity from "../../../schema/admin/UserBlockSchema";

export async function ValidateTokenController(
  req,
  res,
  role,
  role2 = null,
  role3 = null
) {
  const token = req.headers.authorization || req.headers.token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - Token missing" });
  }
  const blackListToken = await BlackListTokenEntity.findOne({ token: token });

  if (blackListToken != null) {
    return res.status(401).json({ error: "Forbidden - Invalid token" });
  }

  try {
    const decoded = jwt.verify(`${token}`, process.env.JWT_SECRET);
    // req.user = decoded;

    const blockUser = await UserBlockEntity.findOne({ email: decoded.email });
    if (blockUser != null && blockUser.isDeleted == true) {
      return res
        .status(403)
        .send({ success: false, error: "Account terminated by admin" });
    } else if (blockUser != null && blockUser.isBlocked == true) {
      return res.status(403).send({ success: false, error: "Account banned" });
    }

    if (
      !(
        (
          decoded.role === role ||
          decoded.role === role2 ||
          decoded.role === role3
        )
        // || decoded.email ===
      )
    ) {
      return res.status(403).json({ error: "Forbidden - Invalid token" });
    }

    let exists = null;
    if (
      decoded.role === "user" ||
      decoded.role2 === "user" ||
      decoded.role3 === "user"
    ) {
      exists = await UserEntity.findOne({ email: decoded.email });
    }
    if (exists != null) return;

    if (
      decoded.role === "cleaner" ||
      decoded.role2 === "cleaner" ||
      decoded.role3 === "cleaner"
    ) {
      exists = await ServiceProviderEntity.findOne({ email: decoded.email });
    }
    if (exists != null) return;

    if (
      decoded.role === "admin" ||
      decoded.role2 === "admin" ||
      decoded.role3 === "admin"
    ) {
      exists = await AdminEntity.findOne({ email: decoded.email });
    }

    if (
      decoded.role === "temp-cleaner" ||
      decoded.role2 === "temp-cleaner" ||
      decoded.role3 === "temp-cleaner"
    ) {
      exists = await ServiceProviderEntity.findOne({ email: decoded.email });
    }
    if (exists != null) return;
  } catch (error) {
    return res.status(403).json({ error: "Forbidden - Invalid token" });
  }
}
