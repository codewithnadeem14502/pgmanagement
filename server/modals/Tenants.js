import mongoose from "mongoose";

const TenantsSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  deposit: {
    type: String,
  },
  sharing1: {
    type: String,
  },
  sharing2: {
    type: String,
  },
  sharing3: {
    type: String,
  },
  sharing4: {
    type: String,
  },
  sharing5: {
    type: String,
  },
  sharing5: {
    type: String,
  },
  clientName: {
    type: String,
    required: true,
  },
  floorNo: {
    type: String,
    required: true,
  },
  flatNo: {
    type: String,
    required: true,
  },
  noOfSharing: {
    type: String,
    required: true,
  },
  DateFrom: {
    type: String,
    required: true,
  },
  DateTo: {
    type: String,
    required: true,
  },
  RentAmount: {
    type: String,
  },
  AmountPaid: {
    type: String,
  },
  RemainingAmount: {
    type: String,
  },
  PhoneNo: {
    type: String,
    required: true,
  },
  Status: {
    type: String,
  },
  adhaarcardno: {
    type: String,
    required: true,
  },
  IsNew: {
    type: Boolean,
    required: true,
  },
  DepositPaid: {
    type: Boolean,
    required: true,
  },
  RentPaid: {
    type: Boolean,
    required: true,
  },
  // expiresAt: {
  //   type: Date,
  //   default: () => new Date(Date.now() + 7776000000), // 7776000000 milliseconds = 3 months
  //   index: { expires: "7776000" }, // Documents will be automatically deleted after 3 months
  // },
});

const TenantsModal = mongoose.model("tenant", TenantsSchema);
export default TenantsModal;
