import mongoose from "mongoose";
import { User } from "../schema/user.schema.js";
import { Contract } from "../schema/contract.schema.js";
async function createContract(req, res) {
  try {
    const { contractName, contractRecieverEmail, expiryDate, contractBody } =
      req.body;
    console.log("Decoded JWT payload (req.user):", req.user);
    console.log("req.user.id:", req.user.id);
    console.log("Type of req.user.id:", typeof req.user.id);

    //this is to get id of contract creator from headers
    //note for myself: bcoz req.user.id returns just a string, and becoz of schema, only objectID is expected
    // ObjectID is not a plain string!!!
    //so to convert string to ObjectID, mongoose.Types.ObjectID() is used....
    const contractMaker = new mongoose.Types.ObjectId(req.user.id);

    let contractReciever;
    const existingUser = await User.findOne({ email: contractRecieverEmail });
    if (existingUser) {
      contractReciever = new mongoose.Types.ObjectId(existingUser._id);
    } else {
      return res.status(400).send("reciever user is not registered");
    }

    const newContract = new Contract({
      contractMaker,
      contractName,
      contractReciever,
      expiryDate,
      contractBody,
    });

    await newContract.save();
    res.status(200).send("New Contract saved successfully");
  } catch (error) {
    console.log(`error occoured while saving the contract to DB: ${error}`);
    res.status(500).send("Internal server error");
  }
}
export default createContract;
