import { client } from "../config/redis.config.js";

async function fetchUsernameFromRedis(req, res) {
  try {
    const id = req.user.id;
    const userId = client.get(id);
    if (userId) {
      return res.status(200).json({ userId: userId });
    } else {
      return res.status(404).send("Not found");
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send("Internal server error");
  }
}
export default fetchUsernameFromRedis;
