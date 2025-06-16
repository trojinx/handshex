import { User } from "../schema/user.schema.js";
import { Contract } from "../schema/contract.schema.js";
async function createContract(req, res) {
  try {
    const { contractName, contractRecieverEmail, expiryDate, contractBody } =
      req.body;
    const contractMaker = req.user.id;
    let contractReciever;
    const existingUser = await User.findOne({ email: contractRecieverEmail });
    if (existingUser) {
      const contractReciever = existingUser._id;
    } else {
      res.status(400).send("reciever user is not registered");
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
