import { Schema, model, models } from "mongoose";

const LoginSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const LoginEntity = models.Login || model("Login", LoginSchema);
export default LoginEntity;
