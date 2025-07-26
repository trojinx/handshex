// import client from "../config/redis.config.js";
// async function connectRedis(req, res) {
//   try {
//     await client.set("myKey", "hello world");
//     const value = client.get("myKey");
//     res.status(200).json({
//       value: value,
//     });
//   } catch (e) {
//     console.log(e);
//     return res.status(500).send("Redis testing error");
//   }
// }
// export default connectRedis;
