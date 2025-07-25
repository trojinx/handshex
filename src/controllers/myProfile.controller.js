import { User } from "../schema/user.schema.js";

async function showProfile(req, res) {
  try {
    const id = req.user.id;

    const foundProfile = await User.findOne({ _id: id }).select("-password");
    if (foundProfile) {
      return res.status(200).json({
        foundProfile,
      });
    } else {
      return res.status(400).send("username not found");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
}

export default showProfile;
