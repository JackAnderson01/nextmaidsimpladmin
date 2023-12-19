import { Schema, model, models } from "mongoose";

const ExtraSchema = new Schema({
  serviceName: {
    type: String,
  },
  price: {
    type: Number,
  },
});

const ExtraEntity = models.Extra || model("Extra", ExtraSchema);
export default ExtraEntity;
