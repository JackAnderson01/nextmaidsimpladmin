import { Schema, model, models } from "mongoose";

const AdminSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

const AdminEntity = models.Admin || model("Admin", AdminSchema);
export default AdminEntity;
