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
import showNotVerifiedContracts from "./src/controllers/showNotVerifiedContractsMakerSide.controller.js";
import showActiveContracts from "./src/controllers/showActiveContracts.controller.js";
import showExpiredContracts from "./src/controllers/showExpiredContracts.controller.js";
import findUnVerifiedContractsOnRecieverSide from "./src/controllers/unverifiedContractsRecieverSide.controller.js.js";
import showNotVerifiedContractsOnMakerSide from "./src/controllers/showNotVerifiedContractsMakerSide.controller.js";
import verifyContract from "./src/controllers/verifyContract.controller.js";
import completeContract from "./src/controllers/completeContract.controller.js";
import { connectRedisCache } from "./src/config/redis.config.js";
import saveTocache from "./src/middlewares/redisCache.middleware.js";
import fetchUsernameFromRedis from "./src/controllers/redisFetch.controller.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
connectDB();
connectRedisCache();

//____________________________________________________________________________
//auth routes:
app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "get-started.html"));
});
app.post("/signup", signUp);
app.post("/signIn", signIn);
//____________________________________________________________________________

//user routes:
app.get("/searchUser", verifyJWT, searchUser);
app.get("/myProfile", verifyJWT, showProfile);
//____________________________________________________________________________

//contract routes
app.post("/createContract", verifyJWT, saveTocache, createContract);
app.get("/showSingleContract", verifyJWT, showSingleContract);
app.get("/showContract", verifyJWT, showContract);
app.get("/searchContract", verifyJWT, searchContract);
app.get("/myContracts", verifyJWT, myContracts);
app.get("/checkContractExpiry", verifyJWT, checkIfContractExpires);
app.get(
  "/unverifiedContracts",
  verifyJWT,
  findUnVerifiedContractsOnRecieverSide
); //notifications wala API
app.patch("/verifyContract", verifyJWT, verifyContract);
app.get("/completeContract", verifyJWT, completeContract);
//____________________________________________________________________________

//contract routes on basis of status:
app.get(
  "/showNotVerifiedContracts",
  verifyJWT,
  showNotVerifiedContractsOnMakerSide
);
app.get("/showActiveContracts", verifyJWT, showActiveContracts);
app.get("/showExpiredContracts", verifyJWT, showExpiredContracts);
//____________________________________________________________________________

//miscellaneous routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});
app.get("/welcome", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.get("/redisTesting", verifyJWT, fetchUsernameFromRedis);
//____________________________________________________________________________

app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`server started on: http://localhost:${process.env.PORT}`);
});

//testing
