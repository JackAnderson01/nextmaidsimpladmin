import { Schema, model, models } from "mongoose";

const HowOftenSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
});

const HowOftenEntity = models.HowOften || model("HowOften", HowOftenSchema);
export default HowOftenEntity;
