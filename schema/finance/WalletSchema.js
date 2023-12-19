import { Schema, model, models } from "mongoose";

const WalletSchema = new Schema({
  email: { type: String, required: true },
  balance: { type: Number, required: true },
});

const WalletEntity = models.Wallet || model("Wallet", WalletSchema);
export default WalletEntity;
