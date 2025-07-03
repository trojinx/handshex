import { Contract } from "../schema/contract.schema.js";

async function verifyContract(req, res) {
  try {
    const id = req.user.id;
    let canBeUpdated = true;
    const { contractId, statusUpdate } = req.body;
    const contractToBeUpdated = await Contract.findOne({ _id: contractId });
    if (contractToBeUpdated.contractMaker == id) {
      canBeUpdated = false;
    }
    if (canBeUpdated) {
      const updatedContract = await Contract.updateOne(
        { _id: contractId },
        { contractStatus: statusUpdate }
      );
      return res.status(200).send("contract updated successfully");
    } else {
      return res.status(200).send("Contract maker cannot verify the contract");
    }
  } catch (error) {
    console.log(`Error occoured: ${error}`);
    return res.status(500).send("Internal server error");
  }
}

export default verifyContract;
