import express from "express";
import {
  AddPg,
  EditPg,
  DeletePG,
  AllPG,
  Login,
  Logout,
  ForgotPassword,
  ResetPassword,
  Admin,
  GetPgbyID,
  Profile,
} from "../controllers/PG.js";
import isAuth from "../middlewares/isAuth.js";
import AdminAuth from "../middlewares/AdminAuth.js";

const router = express.Router();

router.post("/login", Login);
router.get("/profile", isAuth, Profile);
router.get("/logout", Logout);
router.post("/admin", Admin);
router.post("/forgotpassword", ForgotPassword);
router.post("/resetpassword/:id/:resetIdentifier", ResetPassword);
router.post("/register", AddPg);
router.get("/allpg", AdminAuth, AllPG);
router.put("/edit/:id", EditPg);
router.get("/pgdetails/:id", GetPgbyID);
router.delete("/delete/:id", DeletePG);

export default router;
