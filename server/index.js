import express from "express";
import mongoose from "mongoose";
import pgRouter from "./routes/PG.js";
import TenantsRouter from "./routes/Tenants.js";
import dotenv from "dotenv";
import cors from "cors";
import isAuth from "./middlewares/isAuth.js";
dotenv.config();
import cookieParser from "cookie-parser";
const app = express();

const PORT = process.env.PORT;
mongoose
  .connect(process.env.MONGODB_URL)
  // .connect("mongodb://127.0.0.1:27017/PG")
  .then(() => console.log(`DataBase is connected ${PORT}`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders:
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    credentials: true,
  })
);

app.use("/api/v1/pg", pgRouter);
app.use("/api/v1/tenant", TenantsRouter);
app.use(isAuth);

app.listen(PORT, () => {
  console.log("Server is working");
});
