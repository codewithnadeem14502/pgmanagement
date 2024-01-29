import mongoose from "mongoose";

const AddPGSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  pgname: {
    type: String,
    required: true,
  },
  pgaddress: {
    type: String,
    required: true,
  },
  pgnumber: {
    type: String,
    required: true,
  },
  pgplantype: {
    type: String,
    required: true,
  },
  paid: {
    type: Boolean,
    required: true,
  },
  Date: {
    type: Date,
    default: Date.now,
  },
});

const AddPgModal = mongoose.model("addPG", AddPGSchema);
export default AddPgModal;
