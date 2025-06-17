import { Contract } from "../schema/contract.schema.js";
async function showContract(req, res) {
  const id = req.user.id;
  const foundContracts = await Contract.find({
    $or: [{ contractMaker: id }, { contractReciever: id }],
  });
  if (foundContracts) {
    return res.status(200).json({
      foundContracts,
      message: "contracts found successfully",
    });
  } else {
    return res.status(400).send("No contracts found");
  }
}

export default showContract;
