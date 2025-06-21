import connectDB from "./src/config/db.config.js";
import app from "./src/config/express.config.js";
import dotenv from "dotenv";
import signUp from "./src/controllers/signUp.controller.js";
import signIn from "./src/controllers/signIn.controller.js";
import createContract from "./src/controllers/createContract.controller.js";
import verifyJWT from "./src/middlewares/verifyJWT.middleware.js";
import showContract from "./src/controllers/showContract.controller.js";
import searchContract from "./src/controllers/searchContract.controller.js";
import searchUser from "./src/controllers/searchUser.controller.js";
import checkIfContractExpires from "./src/controllers/checkContractExpires.controller.js";
import myContracts from "./src/controllers/myContracts.controller.js";
// import checkIfContractExpires from "./src/controllers/checkContractExpires.controller.js";
dotenv.config();
app.post("/createContract", verifyJWT, createContract); // TODO: make a middleware for verifying if the reciever user has agreed to the contract
app.post("/signup", signUp);

app.post("/signIn", signIn);

app.get("/showContract", verifyJWT, showContract);

app.get("/searchContract", verifyJWT, searchContract);

app.get("/searchUser", verifyJWT, searchUser);

// app.get("/contractExpiry", verifyJWT, checkIfContractExpires);
app.get("/myContracts", verifyJWT, myContracts);

app.get("/checkContractExpiry", verifyJWT, checkIfContractExpires);
connectDB();

app.listen(process.env.PORT, () => {
  console.log(`server started on: http://localhost:${process.env.PORT}`);
});
