// this will be used when view button is pressed over a contract

import { Contract } from '../schema/contract.schema.js';

async function showSingleContract(req, res) {
  const user = req.user.id;
  const id = req.query.id;
  try {
    const foundContract = await Contract.findById(id);
    if (
      foundContract.contractMaker == user ||
      foundContract.contractReciever == user
    ) {
      return res.status(200).json({
        foundContract: foundContract,
      });
    } else {
      return res.status(400).send('No such contract found');
    }
  } catch (error) {
    console.log(`Error occoured: ${error}`);
    return res.status(500).send('Internal server error');
  }
}

export default showSingleContract;
