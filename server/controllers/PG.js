import AddPgModal from "../modals/PG.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export const Login = async (req, res) => {
  const { email, password } = req.body;

  const user = await AddPgModal.findOne({ email });
  // console.log(user.Date);
  if (!user) {
    return res.json({ message: "User Don't Exist" });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  // console.log("hashed ", isPasswordMatch);
  if (!isPasswordMatch) {
    return res.json({ message: "Username or Password is Incorrect" });
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
      Date: user.Date,
      pgplantype: user.pgplantype,
    },
    "secret"
  );

  res.json({ token, message: "Login Successfully" });
};
export const Profile = async (req, res) => {
  return res.json({
    id: req.id,
    email: req.email,
    Date: req.Date,
    plantype: req.pgplantype,
  });
};

export const AddPg = async (req, res) => {
  const { email, password, pgname, pgaddress, pgnumber, pgplantype, paid } =
    req.body;
  // const storedDate = storedDateDocument ? storedDateDocument.storedDate : null;
  // console.log("Body ", req.body);
  // Check if email already exists

  const existingEmail = await AddPgModal.find({ email });
  if (existingEmail.length > 0) {
    return res.json({ message: "Email Already Exists" });
  }

  try {
    // Create a new Pg document
    // console.log("password ", password, "\n");
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log("hashedpass ", hashedPassword);
    const newPg = await AddPgModal.create({
      email: email,
      password: hashedPassword,
      pgname: pgname,
      pgaddress: pgaddress,
      pgnumber: pgnumber,
      pgplantype: pgplantype,
      paid: paid,
      // Date: storedDate,
    });

    res.status(200).json({ message: "Created Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const Logout = (req, res) => {
  res.clearCookie("access-token", { httpOnly: true });

  res.json({ message: "Logout Successful" });
};

export const EditPg = async (req, res) => {
  const { email, pgname, pgaddress, pgnumber, pgplantype, paid } = req.body;
  const id = req.params.id;
  // console.log("eidit ", req.body);
  try {
    // Check if document with _id exists
    const existingPg = await AddPgModal.findById(id);

    if (!existingPg) {
      return res.status(404).json({ message: "Pg not found" });
    }

    // Update the Pg document
    existingPg.email = email;
    existingPg.pgname = pgname;
    existingPg.pgaddress = pgaddress;
    existingPg.pgnumber = pgnumber;
    existingPg.pgplantype = pgplantype;
    existingPg.paid = paid;

    // Save the updated Pg document
    await existingPg.save();

    res.status(200).json({ message: "Updated Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const GetPgbyID = async (req, res) => {
  const id = req.params.id;
  // console.log("gettttt");
  try {
    // Find PG by ID in the database
    const pg = await AddPgModal.findById(id);

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

export const DeletePG = async (req, res) => {
  const id = req.params.id;

  try {
    const respond = await AddPgModal.findByIdAndDelete({
      _id: id,
    });
    res.json({ message: "Deleted Successfully" });
    // console.log(respond);
  } catch (error) {
    console.log(error);
    res.json({ message: "Invalid ID" });
  }
};
export const AllPG = async (req, res) => {
  try {
    const respond = await AddPgModal.find({});
    res.json(respond);
  } catch (error) {
    console.log(error);
  }
};
export const Admin = (req, res) => {
  const { email, password } = req.body;

  try {
    const AdminEmail = "admin@gmail.com";
    const AdminPassword = "nadeem@123";

    if (email !== AdminEmail || password !== AdminPassword) {
      return res.json({
        message: "Unauthorized - Email or Password is incorrect",
      });
    }
    const token = jwt.sign({ email }, "secret", {
      expiresIn: "30d",
    });
    res.status(200).json({ token, message: "Admin login successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const emailUser = process.env.EMAIL_USER;
// instead of orgin password add app password, check below reference link
const emailPass = process.env.EMAIL_PASS;
// console.log(emailUser, emailPass);
// Create a transporter with your email service configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

// for frontend use  npm i vite-plugin-rewrite-all package to navigating from mail link to the project but it involed dot init so that use above package,but now its  deprecated so we need to find other one like : npm install vite-plugin-mock --save-dev
export const ForgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await AddPgModal.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a unique identifier
    const resetIdentifier = Date.now().toString();

    // Store the reset identifier in the user's record in the database
    user.resetIdentifier = resetIdentifier;
    await user.save();
    const ForgetPass = process.env.FRONTEND_URL;
    // Construct the reset link with the reset identifier
    const resetLink = `${ForgetPass}/reset_password/${user._id}/${resetIdentifier}`;

    // Define the email options
    const mailOptions = {
      from: emailUser,
      to: email,
      subject: "Password Reset",
      text: `Click on the following link to reset your password: ${resetLink}`,
    };

    // Send the reset email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending reset email:", error.message);
        res.status(500).json({ message: "Error sending reset email" });
      } else {
        res.status(200).json({
          message: "Password reset link sent to your email",
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// -> reference link to set app password : myaccount.google.com/apppasswords

// check with real data,error is jwt malformed
export const ResetPassword = async (req, res) => {
  const { id, identifier } = req.params;
  const { password } = req.body;

  try {
    // Check if the identifier matches the user
    const user = await AddPgModal.findById(id);
    if (!user || user.resetIdentifier !== identifier) {
      return res.status(400).json({ message: "Invalid reset identifier" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password in the database and clear the reset identifier
    user.password = hashedPassword;
    user.resetIdentifier = undefined;
    await user.save();

    res.json({ message: "Password Updated" });
  } catch (error) {
    console.error("Error resetting password:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
