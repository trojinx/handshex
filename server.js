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
import checkIfContractExpires from "./src/middlewares/checkContractExpires.middleware.js";
import myContracts from "./src/controllers/myContracts.controller.js";
import showProfile from "./src/controllers/myProfile.controller.js";
import { fileURLToPath } from "url";
import path from "path";
import showSingleContract from "./src/controllers/showSingleContract.controller.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "get-started.html"));
});

app.post("/createContract", verifyJWT, createContract); // TODO: make a middleware for verifying if the reciever user has agreed to the contract
app.post("/signup", signUp);
app.get("/showSingleContract", verifyJWT, showSingleContract);

app.post("/signIn", signIn);

app.get("/showContract", verifyJWT, showContract);

app.get("/searchContract", verifyJWT, searchContract);

app.get("/searchUser", verifyJWT, searchUser);

app.get("/myContracts", verifyJWT, myContracts);

app.get("/checkContractExpiry", verifyJWT, checkIfContractExpires);

app.get("/myProfile", verifyJWT, showProfile);

app.get("/welcome", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`server started on: http://localhost:${process.env.PORT}`);
});
