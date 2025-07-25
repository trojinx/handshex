import { Contract } from "../schema/contract.schema.js";

async function showActiveContracts(req, res) {
  try {
    const id = req.user.id;
    const foundNotVerifiedContracts = await Contract.find({
      $and: [
        { $or: [{ contractMaker: id }, { contractReciever: id }] },
        { contractStatus: "Active" },
      ],
    });
    if (foundNotVerifiedContracts.length > 0) {
      return res.status(200).json({
        foundContracts: foundNotVerifiedContracts,
        message: "Found active contracts successfullly",
      });
    } else if (foundNotVerifiedContracts.length == 0) {
      return res.status(400).send("No active contracts found!");
    }
  } catch (error) {
    console.log(`error occoured: ${error}`);
    return res.status(500).send("Internal server error");
  }
}

export default showActiveContracts;
