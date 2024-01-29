import express from "express";
import {
  AddTenant,
  EditTenant,
  DeletePG,
  GetTenantbyID,
  userTenantID,
} from "../controllers/Tenants.js";

const router = express.Router();

router.get("/:id", GetTenantbyID);
router.get("/user/:userid", userTenantID);
router.post("/add", AddTenant);
router.put("/edit/:id", EditTenant);
router.delete("/delete/:id", DeletePG);

export default router;
