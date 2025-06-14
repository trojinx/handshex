import mongoose from "mongoose";
import connectDB from "./src/config/db.config.js";
import app from "./src/config/express.config.js";
import dotenv from "dotenv";
import signUp from "./src/controllers/signUp.controller.js";
import signIn from "./src/controllers/signIn.controller.js";

dotenv.config();
app.post("/signup", signUp);

app.post("/signIn", signIn);
connectDB();

app.listen(process.env.PORT, () => {
  console.log(`server started on: http://localhost:${process.env.PORT}`);
});
