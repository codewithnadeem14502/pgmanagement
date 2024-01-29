import TenantsModal from "../modals/Tenants.js";
import cron from "node-cron";
export const AddTenant = async (req, res) => {
  const {
    userId,
    deposit,
    sharing1,
    sharing2,
    sharing3,
    sharing4,
    sharing5,
    clientName,
    floorNo,
    flatNo,
    noOfSharing,
    DateFrom,
    DateTo,
    RentAmount,
    AmountPaid,
    RemainingAmount,
    PhoneNo,
    Status,
    IsNew,
    DepositPaid,
    RentPaid,
    adhaarcardno,
  } = req.body;

  try {
    const newTenant = await TenantsModal.create({
      userId,
      deposit,
      sharing1,
      sharing2,
      sharing3,
      sharing4,
      sharing5,
      clientName,
      floorNo,
      flatNo,
      noOfSharing,
      DateFrom,
      DateTo,
      RentAmount,
      AmountPaid,
      RemainingAmount,
      PhoneNo,
      Status,
      IsNew,
      DepositPaid,
      RentPaid,
      adhaarcardno,
    });

    res.status(200).json({ message: "Created Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const EditTenant = async (req, res) => {
  const {
    clientName,
    deposit,
    sharing1,
    sharing2,
    sharing3,
    sharing4,
    sharing5,
    floorNo,
    flatNo,
    noOfSharing,
    DateFrom,
    DateTo,
    RentAmount,
    AmountPaid,
    RemainingAmount,
    PhoneNo,
    Status,
    IsNew,
    DepositPaid,
    RentPaid,
    adhaarcardno,
  } = req.body;
  const id = req.params.id;
  // console.log("eidit ", req.body);
  try {
    // Check if document with _id exists
    const existingTenant = await TenantsModal.findById(id);

    if (!existingTenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }

    // Update the Tenant document
    existingTenant.clientName = clientName;
    existingTenant.floorNo = floorNo;
    existingTenant.deposit = deposit;
    existingTenant.sharing1 = sharing1;
    existingTenant.sharing2 = sharing2;
    existingTenant.sharing3 = sharing3;
    existingTenant.sharing4 = sharing4;
    existingTenant.sharing5 = sharing5;
    existingTenant.flatNo = flatNo;
    existingTenant.noOfSharing = noOfSharing;
    existingTenant.adhaarcardno = adhaarcardno;
    existingTenant.DateFrom = DateFrom;
    existingTenant.DateTo = DateTo;
    existingTenant.RentAmount = RentAmount;
    existingTenant.RemainingAmount = RemainingAmount;
    existingTenant.AmountPaid = AmountPaid;
    existingTenant.PhoneNo = PhoneNo;
    existingTenant.Status = Status;
    existingTenant.IsNew = IsNew;
    existingTenant.DepositPaid = DepositPaid;
    existingTenant.RentPaid = RentPaid;
    await existingTenant.save();

    res.status(200).json({ message: "Updated Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const DeletePG = async (req, res) => {
  const id = req.params.id;

  try {
    const respond = await TenantsModal.findByIdAndDelete({
      _id: id,
    });
    res.json({ message: "Deleted Successfully" });
    // console.log(respond);
  } catch (error) {
    console.log(error);
    res.json({ message: "Invalid ID" });
  }
};
export const GetTenantbyID = async (req, res) => {
  const id = req.params.id;
  // console.log("gettttt");
  try {
    // Find PG by ID in the database
    const pg = await TenantsModal.findById(id);

    if (!pg) {
      return res.status(404).json({ message: "PG not found" });
    }

    // Return the PG information
    res.status(200).json(pg);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const userTenantID = async (req, res) => {
  const userid = req.params.userid;

  try {
    // Find Tenant by ID in the database
    const Tenants = await TenantsModal.find({ userId: userid });
    if (Tenants.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the PG information
    res.status(200).json(Tenants);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const updateTenantStatus = async () => {
  try {
    const tenantsToUpdate = await TenantsModal.find({ Status: { $gt: 0 } });

    for (const tenant of tenantsToUpdate) {
      tenant.Status -= 1;
      await tenant.save();
    }

    console.log("Database updated successfully.");
  } catch (error) {
    console.error("Error updating database:", error);
  }
};
// Schedule the cron job to run every day at midnight (12:00 AM)
cron.schedule("0 0 * * *", async () => {
  await updateTenantStatus();
});

// cron.schedule("* * * * *", async () => {
//   await updateTenantStatus();
// });
