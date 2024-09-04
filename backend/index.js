import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import router from "./routers/user.route.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your client's origin
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send(Work);
});
app.use("/api/v1", router);

mongoose
  .connect(
    "mongodb+srv://root:root@cluster0.vcbdv.mongodb.net/?retryWrites=true&w=majority&appName=apptest"
  )
  .then(() => {
    app.listen(4000, () => {
      console.log("server started at port 4000 and databse connected");
    });
  })
  .catch((err) => {
    console.log("Error in Mongo DB", err.message);
  });
