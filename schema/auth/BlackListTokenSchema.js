import { Schema, model, models } from "mongoose";

const BlackListTokenSchema = new Schema({
  token: { type: String, required: true },
});

const BlackListTokenEntity =
  models.BlackListToken || model("BlackListToken", BlackListTokenSchema);
export default BlackListTokenEntity;
