import { Contract } from '../schema/contract.schema.js';

async function myContracts(req, res) {
  //fetch userid from JWT
  // query the DB to find id's contracts {from contractMaker, contractReceiver}
  // return if found
  // else 400

  try {
    const id = req.user.id;
    const foundContracts = await Contract.find({
      $or: [{ contractMaker: id }, { contractReciever: id }],
    });

    if (foundContracts.length > 0) {
      return res.status(200).json({
        foundContracts,
      });
    } else if (foundContracts.length == 0) {
      return res.status(400).send('No contracts found!');
    }
  } catch (error) {
    return res.status(500).send(`Internal server error: ${error}`);
  }
}

export default myContracts;
