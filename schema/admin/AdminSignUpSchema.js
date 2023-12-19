import { Schema, model, models } from "mongoose";

const AdminSignUpSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  image: {
    type: String,
  },
});

const AdminSignUpEntity =
  models.AdminSignUp || model("AdminSignUp", AdminSignUpSchema);
export default AdminSignUpEntity;
