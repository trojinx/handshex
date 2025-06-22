import { User } from "../schema/user.schema.js";
import { Contract } from "../schema/contract.schema.js";

async function completeContract(req, res) {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
}

export default completeContract;
