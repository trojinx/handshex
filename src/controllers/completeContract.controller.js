import { User } from "../schema/user.schema.js";
import { Contract } from "../schema/contract.schema.js";

async function completeContract(req, res) {
  try {
    const userID = req.user.id;
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const expiringContracts = await Contract.find({
      expiryDate: {
        $gte: startOfToday,
        $lte: endOfToday,
      },
      $or: [{ contractMaker: userID }, { contractReciever: userID }],
    });

    if (expiringContracts.length === 0) {
      return res.status(400).json({ message: "No Expiring contracts found!" });
    }

    return res.status(200).json({
      expiringContracts,
      message: "Found expiring contracts",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
}

export default completeContract;
