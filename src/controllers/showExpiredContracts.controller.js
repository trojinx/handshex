import { Contract } from '../schema/contract.schema.js';

async function showExpiredContracts(req, res) {
  try {
    const id = req.user.id;
    const foundNotVerifiedContracts = await Contract.find({
      $and: [
        { $or: [{ contractMaker: id }, { contractReciever: id }] },
        { contractStatus: 'Expired' },
      ],
    });
    if (foundNotVerifiedContracts.length > 0) {
      return res.status(200).json({
        foundContracts: foundNotVerifiedContracts,
        message: 'Found expired contracts successfullly',
      });
    } else if (foundNotVerifiedContracts.length == 0) {
      return res.status(400).send('No expired contracts found!');
    }
  } catch (error) {
    console.log(`error occoured: ${error}`);
    return res.status(500).send('Internal server error');
  }
}

export default showExpiredContracts;
