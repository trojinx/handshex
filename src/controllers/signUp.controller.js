import bcrypt from "bcrypt";
import { User } from "../schema/user.schema.js";
async function signUp(req, res) {
  try {
    const { username, email, enteredPassword } = req.body;
    const existingUserEmail = await User.findOne({ email: email });
    const existingUsername = await User.findOne({ username: username });

    if (existingUserEmail) {
      res.status(400).send("This email is already linked to another account");
    } else if (existingUsername) {
      res.status(400).send("Username is already taken, try another");
    } else {
      const password = await bcrypt.hash(enteredPassword, 10);
      const newUser = new User({ username, email, password });
      await newUser.save();
      res
        .status(200)
        .send(
          "Welcome to handshex! Your account has been created successfully..."
        );
    }
  } catch (error) {
    console.log(error);
  }
}

export default signUp;
