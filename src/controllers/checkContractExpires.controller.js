import { Contract } from "../schema/contract.schema.js";
async function checkIfContractExpires(req, res) {
  const id = req.user.id;
  const dateToady = new Date();

  const expiringContracts = Contract.find({
    expiryDate: dateToady,
  });
}

export default checkIfContractExpires;

//2025-06-19T05:37:31.585Z
