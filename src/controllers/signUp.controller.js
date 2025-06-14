import bcrypt from "bcrypt";
import { User } from "../schema/user.schema.js";
async function signUp(req, res) {
  try {
    const { username, email, enteredPassword } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      res.status(400).send("Username already registered");
    } else {
      const password = await bcrypt.hash(enteredPassword, 10);
      const newUser = new User({ username, email, password });
      await newUser.save();
      res.status(200).send("User added to database successfully");
    }
  } catch (error) {
    console.log(error);
  }
}

export default signUp;
