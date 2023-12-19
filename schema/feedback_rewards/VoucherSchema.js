import { Schema, model, models } from "mongoose";

const VoucherSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  discountTitle: {
    type: String,
    required: true,
  },
  discountCode: {
    type: String,
    required: true,
  },
  expiryDate: {
    type: String,
    required: true,
  },
  discountPercent: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
    required: false,
  },
});

const VoucherEntity = models.Voucher || model("Voucher", VoucherSchema);
export default VoucherEntity;
