import { client } from "../config/redis.config.js";
async function saveTocache(req, res, next) {
  try {
    const userID = req.user.id;
    const username = req.user.username;
    client.set(userID, username);
    next();
    return res.status(201).send("Data saved to cache successfully");
  } catch (e) {
    console.log(e);
    return res.status(500).send("Internal server error");
  }
}

export default saveTocache;
