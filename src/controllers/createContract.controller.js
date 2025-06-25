import { User } from "../schema/user.schema.js";
import { Contract } from "../schema/contract.schema.js";
async function createContract(req, res) {
  // extract contractName, contractRecieverEmail, expiryDate and contractBody
  // extract contractMaker from JWT {HTTP headers}
  // check if contractReciever is signed up
  // check if contract name is unique
  // check if contractBody is not empty
  // save the contract

  try {
    const { contractName, contractRecieverEmail, expiryDate, contractBody } =
      req.body;
    let contractRecieverUsername;
    if (!contractBody) {
      return res.status(400).send("The contract must not be empty");
    }
    const existingContract = await Contract.findOne({
      contractName: contractName,
    });
    if (existingContract) {
      return res.status(400).send("The contract name must be unique...");
    }

    const contractMaker = req.user.id;
    const constMakerUsername = req.user.username;
    const contractMakerEmail = req.user.email;
    let contractReciever;
    const existingUser = await User.findOne({ email: contractRecieverEmail });
    if (existingUser) {
      contractReciever = existingUser._id;
      contractRecieverUsername = existingUser.username;
    } else {
      return res.status(400).send("reciever user is not registered");
    }

    const newContract = new Contract({
      contractMaker,
      contractName,
      contractReciever,
      expiryDate,
      contractBody,
      contractRecieverEmail,
      contractRecieverUsername,
      contractMakerEmail,
      constMakerUsername,
    });

    await newContract.save();
    res.status(200).send("New Contract saved successfully");
  } catch (error) {
    console.log(`error occoured while saving the contract to DB: ${error}`);
    return res.status(500).send("Internal server error");
  }
}
export default createContract;
