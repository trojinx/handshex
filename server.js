import connectDB from "./src/config/db.config.js";
import app from "./src/config/express.config.js";
import dotenv from "dotenv";
import signUp from "./src/controllers/signUp.controller.js";
import signIn from "./src/controllers/signIn.controller.js";
import createContract from "./src/controllers/createContract.controller.js";
import verifyJWT from "./src/middlewares/verifyJWT.middleware.js";
import showContract from "./src/controllers/showContract.controller.js";
import searchContract from "./src/controllers/searchContract.controller.js";

dotenv.config();
app.post("/createContract", verifyJWT, createContract);
app.post("/signup", signUp);

app.post("/signIn", signIn);

app.get("/showContract", verifyJWT, showContract);

app.get("/searchContract", verifyJWT, searchContract);

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`server started on: http://localhost:${process.env.PORT}`);
});
