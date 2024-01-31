import express from "express";
import mongoose from "mongoose";
import pgRouter from "./routes/PG.js";
import TenantsRouter from "./routes/Tenants.js";
import dotenv from "dotenv";
import cors from "cors";
import isAuth from "./middlewares/isAuth.js";
dotenv.config();
import cookieParser from "cookie-parser";

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

const PORT = process.env.PORT;
mongoose
  // .connect(
  //   "mongodb+srv://doadmin:7I8fWg5p906Zq34O@pgdatabase-13de2ab2.mongo.ondigitalocean.com/admin"
  // )
  .connect("mongodb+srv://doadmin:7I8fWg5p906Zq34O@pgdatabase-13de2ab2.mongo.ondigitalocean.com/admin")
  // .connect("mongodb://127.0.0.1:27017/PG")
  .then(() => console.log(`DataBase is connected ${PORT}`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://www.pgmanagement.tech"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders:
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    credentials: true,
  })
);
// added here
// app.use(isAuth);
app.use("/api/v1/pg", pgRouter);
app.use("/api/v1/tenant", TenantsRouter);

app.use(express.static(path.join(__dirname, "dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log("Server is working");
});
