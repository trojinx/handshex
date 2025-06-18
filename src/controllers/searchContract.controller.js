import { Contract } from "../schema/contract.schema.js";
async function searchContract(req, res) {
  try {
    const { query } = req.query;
    const id = req.user.id;
    const foundContracts = await Contract.find({
      $and: [
        {
          $or: [{ contractMaker: id }, { contractReceiver: id }],
        },
        {
          $or: [
            { contractName: { $regex: query, $options: "i" } },
            { contractBody: { $regex: query, $options: "i" } },
          ],
        },
      ],
    });
    if (foundContracts.length > 0) {
      return res.status(200).json({
        foundContracts,
        message: "contracts found..",
      });
    } else {
      return res.status(400).send("Oops! No contracts found");
    }
  } catch (error) {
    console.log(`Error occoured: ${error}`);
    return res.status(500).send("Internal server error");
  }
}

export default searchContract;
