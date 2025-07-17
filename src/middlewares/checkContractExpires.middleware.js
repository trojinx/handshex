import { Contract } from '../schema/contract.schema.js';

async function checkIfContractExpires(req, res, next) {
  const id = req.user.id;

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);

  try {
    const expiringContracts = await Contract.find({
      expiryDate: {
        $gte: today,
        $lt: tomorrow,
      },
      $or: [{ contractMaker: id }, { contractReceiver: id }],
    });
    if (expiringContracts.length == 0) {
      return res
        .status(400)
        .send(
          'There are no expiring contracts, you can wait for a contract to naturally expire, or forcefully complete it after necessary permissions'
        );
    }
    req.expiringContracts = expiringContracts;
    next();
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching contracts.' });
  }
}

export default checkIfContractExpires;

//TODO: understand why this AI generate shit works....
