import { Contract } from "../schema/contract.schema.js";
//this is notifications wala API

async function findUnVerifiedContractsOnRecieverSide(req, res) {
  try {
    // 1) Find unverified contracts which the user is reciever of
    // 2) then when user clicks on verify button on frontend
    // 3) Update the contract status from "not Verified" to "Active"
    const id = req.user.id;
    const unverifiedContracts = await Contract.find({
      $and: [{ contractReciever: id }, { contractStatus: "Not Verified" }],
    });

    if (unverifiedContracts.length > 0) {
      return res.status(200).json({
        foundContracts: unverifiedContracts,
        message: "Update the contract once verify button is pressed",
      });
    } else if (unverifiedContracts.length == 0) {
      return res.status(400).send("No unverified contracts found");
    }
  } catch (error) {
    console.log(`error occoured: ${error}`);
    return res.status(500).send("Internal server error");
  }
}

export default findUnVerifiedContractsOnRecieverSide;
