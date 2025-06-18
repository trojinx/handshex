import { User } from "../schema/user.schema.js";

async function searchUser(req, res) {
  try {
    const id = req.user.id;
    const query = req.query;

    const foundUsers = await User.find(
      $or[
        ({ username: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } })
      ]
    );
  } catch (error) {
    console.log(`Error occoured: ${error}`);
    return res.status(500).send("Internal server error");
  }
}
