import { createClient } from "redis";

const client = createClient();
async function connectRedisCache() {
  try {
    await client.connect();
    console.log("connected to redis cache server successfully");
  } catch (e) {
    console.log(e);
  }
}
export { connectRedisCache, client };
